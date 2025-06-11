/**
 * API请求日志工具
 * 提供一致的API日志记录格式和方法
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogOptions {
  level?: LogLevel;
  route?: string;
  method?: string;
  params?: Record<string, any>;
  duration?: number;
  statusCode?: number;
}

/**
 * 格式化日志消息
 */
function formatLogMessage(message: string, options: LogOptions = {}): string {
  const { 
    route = '', 
    method = '', 
    params = {}, 
    duration,
    statusCode,
  } = options;
  
  const parts = [
    `[${new Date().toISOString()}]`,
    method && `[${method}]`,
    route && `[${route}]`,
    message,
    statusCode !== undefined && `[Status: ${statusCode}]`,
    duration !== undefined && `[Duration: ${duration}ms]`,
    Object.keys(params).length > 0 && `[Params: ${JSON.stringify(params)}]`,
  ].filter(Boolean);
  
  return parts.join(' ');
}

/**
 * 记录API请求日志
 */
export function logApiRequest(message: string, options: LogOptions = {}) {
  const { level = 'info' } = options;
  const formattedMessage = formatLogMessage(message, options);
  
  switch (level) {
    case 'info':
      console.log(formattedMessage);
      break;
    case 'warn':
      console.warn(formattedMessage);
      break;
    case 'error':
      console.error(formattedMessage);
      break;
    case 'debug':
      console.debug(formattedMessage);
      break;
    default:
      console.log(formattedMessage);
  }
  
  // 这里可以扩展，将日志发送到监控系统如Sentry、LogRocket等
}

/**
 * 记录API错误日志
 */
export function logApiError(error: unknown, message: string, options: LogOptions = {}) {
  const errorMessage = error instanceof Error 
    ? error.message 
    : String(error);
    
  const stackTrace = error instanceof Error 
    ? error.stack 
    : undefined;
  
  logApiRequest(`${message}: ${errorMessage}`, { 
    ...options, 
    level: 'error',
  });
  
  if (stackTrace && process.env.NODE_ENV === 'development') {
    console.error(stackTrace);
  }
}

/**
 * 计算并记录API请求时间
 */
export function createApiTimer(route: string, method: string = 'GET') {
  const startTime = Date.now();
  
  return {
    end: (statusCode: number = 200, params: Record<string, any> = {}) => {
      const duration = Date.now() - startTime;
      const level = statusCode >= 400 ? 'warn' : 'info';
      
      logApiRequest(`Request completed`, { 
        route, 
        method, 
        duration, 
        statusCode,
        params,
        level,
      });
      
      return duration;
    }
  };
}

/**
 * API请求包装函数
 * 用于包装API处理程序以提供一致的日志记录和错误处理
 */
export async function withApiLogging<T>(
  handler: () => Promise<T>,
  route: string,
  method: string = 'GET',
  params: Record<string, any> = {}
): Promise<T> {
  const timer = createApiTimer(route, method);
  
  try {
    logApiRequest(`Request started`, { route, method, params });
    const result = await handler();
    timer.end(200, params);
    return result;
  } catch (error) {
    const statusCode = error instanceof Error && 'statusCode' in error 
      ? (error as any).statusCode 
      : 500;
      
    timer.end(statusCode, params);
    logApiError(error, `Request failed`, { route, method, params });
    throw error;
  }
} 