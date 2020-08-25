const form = document.getElementById('form'),
    result = document.getElementById('result');

const fragment = document.createDocumentFragment();

// Función queinsrta en el HTMl los elementos con los resultados.
// Recibe dos parámetros, los hijos a insertar y el elemento padre
const insertIn = (childs, parent) => {
    if (parent.children.length === 0) {
        parent.appendChild(childs);
    } else {
        const parentChilds = Array.from(parent.children);
        parentChilds.forEach((element) => {
            element.replaceWith(childs);
            console.log(parentChilds);
        });
    }
};
// Función que remueve los hijos de un elemento
// Recibe como parámetro el elemento al que queremos eliminar sus hijos
const removeIn = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

// Función que calcula los valores para cada tabla
// segun lo ingresado por el usuario
const calcTable = () => {
    // Valida que sea un múemro
    if (
        !isNaN(form.multiplier.value) &&
        !isNaN(form.fromThe.value) &&
        !isNaN(form.untilThe.value) &&
        // Valida que no tenga espacios
        form.multiplier.value.indexOf(' ') === -1 &&
        form.fromThe.value.indexOf(' ') === -1 &&
        form.untilThe.value.indexOf(' ') === -1 &&
        // Valida que no sea un decimal
        form.multiplier.value % 1 === 0 &&
        form.fromThe.value % 1 === 0 &&
        form.untilThe.value % 1 === 0
    ) {
        const userValues = {
            multiplier: parseInt(form.multiplier.value),
            fromThe: parseInt(form.fromThe.value),
            untilThe: parseInt(form.untilThe.value),
        };
        for (let i = userValues.fromThe; i <= userValues.untilThe; i++) {
            const p = document.createElement('P');
            p.textContent = `${i} x ${userValues.multiplier} = ${i *
                userValues.multiplier}`;
            fragment.appendChild(p);
        }
    } else {
        const p = document.createElement('P');
        p.textContent = `Uno o más valores no son correctos`;
        fragment.appendChild(p);
    }
    insertIn(fragment, result);
};

// Eventos de escucha
form.addEventListener('submit', (e) => {
    e.preventDefault();
    calcTable();
});

form.addEventListener('reset', () => {
    removeIn(result);
});
