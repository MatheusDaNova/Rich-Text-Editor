let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName")
let fontSize = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
const showCode = document.getElementById('code');
let active = false;
const filename = document.getElementById('filename');
const content = document.getElementById('text-input');

//List font list
let fontList = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Comic Sans MS",
    "Verdana",
    "Garamond",
    "Georgia",
    "cursive",
];

// initial settings
    const initializer = () => {
        highlighter(alignButtons , true);
        highlighter(spacingButtons , true);
        highlighter(scriptButtons , true);
        highlighter(formatButtons, false);

        fontList.map((value) => {
            let option = document.createElement("option");
            option.value = value;
            option.innerHTML = value;
            fontName.appendChild(option);
        });

        for (let i =1; i<= 8; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.innerHTML = i;
            fontSize.appendChild(option);
        }

        fontSize.value = 3;
    }
//HIGHLIGHT CLICKED BUTTON
const highlighter = (className, needsRemoval) =>{
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                 let alreadyActive = false;

                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
            
                highlighterRemover(className);
                if(!alreadyActive){
                    button.classList.add("active");
                }
            }
            else{
                button.classList.toggle("active");
            }
        })
    })
}

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
}

//main logic
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

//options
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

//options with parameters
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

//link
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL");

    if (/http/i.test(userLink)) {
      modifyText(linkButton.id, false, userLink);
    } else {
      userLink = "http://" + userLink;
      modifyText(linkButton.id, false, userLink);
    }
  });

  //show html
  showCode.addEventListener('click', function () {
	showCode.dataset.active = !active;
	active = !active
	if(active) {
		content.textContent = content.innerHTML;
		content.setAttribute('contenteditable', false);
	} else {
		content.innerHTML = content.textContent;
		content.setAttribute('contenteditable', true);
	}
});

//download file
function fileHandle(value) {
	if(value === 'new') {
		content.innerHTML = '';
		filename.value = 'untitled';
	} else if(value === 'txt') {
		const blob = new Blob([content.innerText])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${filename.value}.txt`;
		link.click();
	} else if(value === 'pdf') {
		html2pdf(content).save(filename.value);
	}
};

window.onload = initializer();
