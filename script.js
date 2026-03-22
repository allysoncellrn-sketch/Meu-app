let db;

function iniciarBanco(){
return new Promise((resolve)=>{
let request = indexedDB.open("ALLYSON_DB", 1);
request.onupgradeneeded = e=>{
db = e.target.result;
db.createObjectStore("produtos",{keyPath:"codigo"});
};
request.onsuccess = e=>{
db = e.target.result;
resolve();
};
});
}

iniciarBanco().then(()=>listar());

function salvarProduto(){
let produto={
codigo:codigo.value,
nome:nome.value,
preco:parseFloat(preco.value)||0,
qtd:parseInt(qtd.value)||0
};
let tx=db.transaction("produtos","readwrite");
tx.objectStore("produtos").put(produto);
tx.oncomplete=()=>{listar();alert("Salvo");};
}

function listar(){
let tabela=lista;
tabela.innerHTML="";
let tx=db.transaction("produtos","readonly");
tx.objectStore("produtos").openCursor().onsuccess=e=>{
let c=e.target.result;
if(c){
let p=c.value;
tabela.innerHTML+=`<tr>
<td>${p.nome}</td>
<td>${p.codigo}</td>
<td>${p.preco}</td>
<td>${p.qtd}</td>
</tr>`;
c.continue();
}
};
}
