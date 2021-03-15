


let slides=3,
arrSlides = {},elements = document.querySelectorAll(".mySlides"),
img =[]
console.log(elements)
elements.forEach((a,i)=>{
    img[i]=a.innerHTML
    // a.remove()
})

console.log(img)
for (let i=0;i<slides;i++){
    let a='';a+='slide'+i
    arrSlides[a]=i
}
elements.forEach((a, i) => {
    Object.values(arrSlides).includes(i)?a.style.display = 'block':a.style.display = 'none'
})
function plusDivs(n){
    Object.keys(arrSlides).forEach((Ind)=>{
        let newInd=arrSlides[Ind]+n

        if (newInd > elements.length - 1) {newInd = 0}
        if (newInd < 0) {newInd = elements.length - 1}

        arrSlides[Ind]=newInd
        change()
    })
    console.log(arrSlides)
}

function change() {
    elements.forEach((a, i) => {
        Object.values(arrSlides).includes(i)? console.log('img  ', a.innerHTML=img[i]):0
        Object.values(arrSlides).includes(i)? a.style.display = 'block':a.style.display = 'none'
    })
}
let div=document.createElement('div').classList.add('mySlides')

/*Object.values(arrSlides).forEach((a,i)=>{
    elements.forEach((el, i) => {
        if (a=i){
            div.innerHTML=el
        }
    })
})*/



// let move (){
//
// }

