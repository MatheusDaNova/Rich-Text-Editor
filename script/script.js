let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option_button");
let fontName = document.getElementById("font_name");
let fontSize = document.getElementById("font_size");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("add_link");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//List font list

let fontList = [
    "Roboto",
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
            fontSizeRef.appendChild(option);
        }

        fontSizeRef.value = 3;
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

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
})

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
})
window.onload = initializer();
