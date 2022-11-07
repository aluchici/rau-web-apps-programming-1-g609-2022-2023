// Tutorial
console.log(document);

// Creare elemente
// 1. creez un obiect pentru un anumit tip de element (tag)
const paragraf = document.createElement("p");

// 2. customizez elementul creat
paragraf.innerText = "Acesta este un paragraf creat folosind JavaScript.";
paragraf.style.fontFamily = "Curier";
paragraf.style.color = "white";
paragraf.style.padding = "10px";

// 3. inserez documentul undeva in pagina (DOM)
// 3.1 extrag parintele (nodul) sub care vreau sa adaug elementul
const loginSection = document.getElementById("login");

// 3.2 inserez elemenul nou creat in lista de copii a parintelui
// 3.2.1 inseram la sfarsit
loginSection.appendChild(paragraf);

// 3.2.2. inseram pe o anumita pozitie / in fata unui anumit copil
let element = undefined;
let elementWhereToInsert = undefined;
for (const child of loginSection.children) {
    if (child.className === "login-background") {
        elementWhereToInsert = child;
        for (const grandchild of child.children) {
            if (grandchild.className === "grid-login-section") {
                element = grandchild;  
                break;
            }
        }
        break;
    }
} 
if (elementWhereToInsert !== undefined) {
    elementWhereToInsert.insertBefore(paragraf, element);
}
const copieParagraf = document.createElement("p");
copieParagraf.style.color = paragraf.style.color;
copieParagraf.innerText = paragraf.innerText;
loginSection.appendChild(copieParagraf);

// 4. sterg un element din lista de copii
// loginSection.removeChild(copieParagraf);

// 5. sterg un element 
// element.remove();

const texte = ["Text 1", "Text 2", "Text 3"];
for (const text of texte) {
    const p = document.createElement("p");
    p.style.color = "white";
    p.innerText = text;
    loginSection.appendChild(p);
}