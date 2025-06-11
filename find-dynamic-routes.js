const fs = require('fs');
const path = require('path');

// 递归搜索目录
function searchDirectory(dir, results = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // 检查是否是动态路由目录
      if (file.startsWith('[') && file.endsWith(']')) {
        results.push(filePath);
      }
      
      // 递归搜索子目录
      searchDirectory(filePath, results);
    }
  }
  
  return results;
}

// 从 src/app 目录开始搜索
const appDir = path.join(__dirname, 'src', 'app');
const dynamicRoutes = searchDirectory(appDir);

console.log('找到的动态路由目录:');
dynamicRoutes.forEach(route => {
  console.log(route);
}); 