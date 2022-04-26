//1) Implemente um método que crie um novo array baseado nos valores passados.
//Entradas do método (3,a), Resultado do método: ['a', 'a', 'a']

function criaArray(size, value) {
    var array = [];
    for (var i = 0; i < size; i++) {
        array.push(value);
    }
    return array;
}
console.log(criaArray(3, 'a'));

// 2) Implemente um método que inverta um array, não utilize métodos nativos do array.
// Entrada do método ([1,2,3,4]), Resultado do método: [4,3,2,1]

function inverteArray(array) {
    var arrayInvertido = [];
    var counter = 0;

    for (var _ in array) counter++;

    for (var i = counter - 1; i >= 0; i--) {
        arrayInvertido.push(array[i]);
    }
    return arrayInvertido;
}
console.log(inverteArray([1, 2, 3, 4]));

// 3) Implemente um método que limpe os itens desnecessários de um array (false, undefined, strings vazias, zero, null).
// Entrada do método ([1,2,'', undefined]), Resultado do método: [1,2]

function limpaArray(array) {
    var arrayLimpo = [];
    for (const iterator of array) {
        if (iterator !== '' && iterator !== 0 && iterator !== null && iterator !== undefined) {
            arrayLimpo.push(iterator);
        }
    }
    return arrayLimpo;
}
console.log(limpaArray([1, null, null, 'a', 0, 2, '', undefined]));

// 4) Implemente um método que a partir de um array de arrays, converta em um objeto com chave e valor.
// Entrada do método ([["c",2],["d",4]]), Resultado do métdodo: {c:2, d:4}

function converteArrayEmObjeto(array) {
    var objeto = {};
    for (const iterator of array) {
        objeto[iterator[0]] = iterator[1];
    }
    return objeto;
}
console.log(converteArrayEmObjeto([['c', 2], [4, 3], ['d', 4], ['e', 5]]));

// 5) Implemente um método que retorne um array, sem os itens passados por parâmetro depois do array de entrada.
// Entrada do método ([5,4,3,2,5], 5,3), Resultado do método: [4,2]

function removeItens(array, ...itens) {
    var arrayRemovido = [];
    for (const iterator of array) {
        if (!itens.includes(iterator)) {
            arrayRemovido.push(iterator);
        }
    }
    return arrayRemovido;
}
console.log(removeItens([5, 4, 3, 2, 5], 5, 3));

// 6) Implemente um método que retorne um array, sem valores duplicados.
// Entrada do método ([1,2,3,3,2,4,5,4,7,3]), Resultado do método: [1,2,3,4,5,7]

function removeDuplicados(array) {
    var arrayRemovido = [];
    for (const iterator of array) {
        if (!arrayRemovido.includes(iterator)) {
            arrayRemovido.push(iterator);
        }
    }
    return arrayRemovido;
}
console.log(removeDuplicados([1, 2, 3, 3, 2, 4, 5, 4, 7, 3]));

// 7) Implemente um método que compare a igualdade de dois arrays e retorne um valor booleano.
// Entrada do método ([1,2,3,4],[1,2,3,4]), Resultado do método: true

function comparaArray(array1, array2) {
    var igual = true;
    for (const iterator of array1) {
        if (!array2.includes(iterator)) {
            igual = false;
        }
    }
    return igual;
}
console.log(comparaArray([1, 4, 3, 4], ['a', 2, 3, 4]));


// 8) Implemente um método que remova os aninhamentos de um array de arrays para um array unico.
// Entrada do método ([1, 2, [3], [4, 5]]), Resultado do método: [1, 2, 3, 4, 5]

function removeAninhamento(array) {
    var arrayRemovido = [];
    for (const iterator of array) {
        if (Array.isArray(iterator)) {
            for (const iterator2 of iterator) {
                arrayRemovido.push(iterator2);
            }
        } else {
            arrayRemovido.push(iterator);
        }
    }
    return arrayRemovido;
}
console.log(removeAninhamento([1, 2, [3], [4, [5, [6]]]]));

// 9) Implemente um método divida um array por uma quantidade passada por parâmetro.
// Entrada do método ([1, 2, 3, 4, 5], 2), Resultado do método: [[1, 2], [3, 4], [5]]

function divideArray(array, qtd) {
    var arrayDivisao = [];
    for (let i = 0; i < array.length; i += qtd) {
        arrayDivisao.push(array.slice(i, i + qtd));
    }
    return arrayDivisao;
}
console.log(divideArray([1, 2, 3, 4, 5, 6, 7, 8, 9], 3));

// 10) Implemente um método que encontre os valores comuns entre dois arrays.
// Entrada do método ([6, 8], [8, 9]), Resultado do método: [8]

function encontraValoresComuns(array1, array2) {
    var arrayComuns = [];
    for (const iterator of array1) {
        if (array2.includes(iterator)) {
            arrayComuns.push(iterator);
        }
    }
    return arrayComuns;
}
console.log(encontraValoresComuns([6, 8], [8, 9]));