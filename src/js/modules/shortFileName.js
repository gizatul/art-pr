const shortFileName = (fileName) => {
    let dots; 
    const arrName = fileName.files[0].name.split('.');
    arrName[0].length > 6 ? dots = '...' : dots = '.';
    const name = arrName[0].substring(0, 6) + dots + arrName[1];
    fileName.previousElementSibling.textContent = name; 
}  
export default shortFileName;
        