const fs = require('fs');
const path = require('path');

// 递归删除目录
function deleteFolderRecursive(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
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

// 要删除的目录路径
const directoryToDelete = path.join(__dirname, 'src', 'app', 'projects', '[id]');

// 执行删除
deleteFolderRecursive(directoryToDelete); 