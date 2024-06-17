const los = document.getElementsByClassName("los");
const button = document.getElementsByTagName("button");
const inputArr = [];
for (let i = 0; i < 16; i++) {
    inputArr[i] = document.createElement("input");
    los[0].appendChild(inputArr[i]);
}
button[0].onclick = () => {
    const valArr = inputArr.filter((param) => {
        return param.value;
    })

}
