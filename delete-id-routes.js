const fs = require('fs');
const path = require('path');

// 要删除的目录
const directoriesToDelete = [
  path.join(__dirname, 'src', 'app', 'api', 'blog', '[id]'),
  path.join(__dirname, 'src', 'app', 'api', 'projects', '[id]')
];

// 递归删除目录函数
function deleteFolderRecursive(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach(file => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子目录
        deleteFolderRecursive(curPath);
      } else {
        // 删除文件
        fs.unlinkSync(curPath);
      }
    });
    // 删除空目录
    fs.rmdirSync(directoryPath);
    console.log(`成功删除目录: ${directoryPath}`);
  } else {
    console.log(`目录不存在: ${directoryPath}`);
  }
}

// 执行删除
directoriesToDelete.forEach(dir => {
  console.log(`正在删除目录: ${dir}`);
  deleteFolderRecursive(dir);
}); 