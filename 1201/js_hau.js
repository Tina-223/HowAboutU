let KEY;


function getKeyword(){
    const keyword=document.getElementById("key").value;
    if(keyword===""){
        alert("검색어를 입력하세요");
    } else {
        KEY=keyword;
        location.href="./search.html";
    }
}

