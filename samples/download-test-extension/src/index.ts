import * as shellSdkHelper from './shell-sdk-helper';

const updateUI = (text: string) => {
    (document.querySelectorAll('#info')[0] as any).innerHTML = text;
};

window.addEventListener('load', async () => {

    let UIContextList = '';

    if (shellSdkHelper.isInsideShell) {
        const context = await shellSdkHelper.getContext();

        UIContextList = '<ul>';
        for (const [key, value] of Object.entries(context)) {
            UIContextList = UIContextList + (typeof value === 'object' ?
                '<li>' + `${key}: ${JSON.stringify(value)}` + '</li>' :
                '<li>' + `${key}: ${value}` + '</li>');
        }
        UIContextList = UIContextList + '</ul>';
    }

    updateUI(UIContextList);

    const fileSelect: HTMLElement = document.getElementById("fileSelect")!;
    const fileElem: any = document.getElementById("fileElem")!;
    const fileList: HTMLElement = document.getElementById("fileList")!;
    
    console.log("ELEMENTS: ", {
        fileSelect,
        fileElem,
        fileList
    });
    
    fileSelect.addEventListener("click", function (e) {
      console.log("File select cliecked");
      if (fileElem) {
          console.log("Trigger fileElem click");
        fileElem.click();
      }
      e.preventDefault(); // prevent navigation to "#"
    }, false);
    
    fileElem.addEventListener("change", handleFiles, false);

    function handleFiles() {
        console.log("fileElem changed");
        if (!fileElem.files.length) {
          fileList.innerHTML = "<p>No files selected!</p>";
        } else {
          fileList.innerHTML = "";
          const list = document.createElement("ul");
          fileList.appendChild(list);
          for (let i = 0; i < fileElem.files.length; i++) {
            const li = document.createElement("li");
            list.appendChild(li);
      
            const link = document.createElement("a");
            link.innerHTML = `Download file ${i+1}`;
            link.href = URL.createObjectURL(fileElem.files[i]);
            link.download = fileElem.files[i].name;

            li.appendChild(link);
            const info = document.createElement("span");
            info.innerHTML = fileElem.files[i].name + ": " + fileElem.files[i].size + " bytes";
            li.appendChild(info);
          }
        }
      }

});
