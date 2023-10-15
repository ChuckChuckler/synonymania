let list1 = document.getElementById("top3")
let list2 = document.getElementById("restofsynonyms")
function myFunction(){
  let datamuse = "https://api.datamuse.com/words?rel_syn=";
  let word = document.getElementById("word").value.trim();
  if(word!=""){
    document.getElementById("box").style.visibility="hidden";
document.getElementById("errormessage").style.display = "none";
    datamuse = datamuse + word;
    word = "";
    fetch(datamuse)
      .then(response => {
        if(response.status == 200){
          return response.json();
        }else{
          throw new Error("whoopsidoopsie (wandaho wandaho wan ho ho)");
        }
      })
  
      .then(data =>{
        let synonyms = data.map(entry => entry.word)
        synonyms = synonyms.sort((a, b) => b.score - a.score);
        list1.innerHTML = "";
        list2.innerHTML = "";
        if(synonyms.length == 0){
          let sadmessage = document.createElement("li");
          sadmessage.innerHTML = innerHTML = "Looks like we couldn't find anything :(";
          list1.appendChild(sadmessage);
        }else if(synonyms.length < 2){
          let sadmessage2 = document.createElement("li");
          sadmessage2.innerHTML = innerHTML = "Looks like we couldn't find anything else :(";
          list2.appendChild(sadmessage2);
        }
        for(let i = 0; i < synonyms.length; i++){
          let li = document.createElement("li");
          li.innerHTML = synonyms[i];
          if(i < 3){
            list1.appendChild(li);
          }else{
            document.getElementById("restofsynonyms").appendChild(li);
          }
        }
        document.getElementById("divthing").style.visibility = "visible";
        synonyms = "";
      })
      .catch(error =>{
        console.log(error);
      });
    }else{
    //make an error message showing "No word entered!"
    document.getElementById("errormessage").style.display = "block";
  }
}

document.addEventListener('click', function(findinfo){
  if(findinfo.target && findinfo.target.tagName.toLowerCase() == "li"){
document.getElementById("box").style.visibility="visible";
    document.getElementById("box").innerHTML = "";
    let dictionaryapi = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    let word = findinfo.target.innerHTML.trim();
    dictionaryapi = dictionaryapi + word;
    fetch(dictionaryapi)
      .then(response => {
        if(response.status == 200){
          return response.json();
        }else{
          throw new Error("yokoso! kirakira dokidoki mochimochi puyopuyo wakuwaku washoi");
        }
      })
      .then(data =>{
        console.log(data);
        wordtitle = document.createElement("h2");
        wordtitle.innerHTML = word.toUpperCase();
        document.getElementById("box").appendChild(wordtitle);
        for(let i = 0; i < data.length; i++){
          for(let j = 0; j < data[i].meanings.length; j++){
            let pos = document.createElement("h3");
            pos.innerHTML = data[i].meanings[j].partOfSpeech;
            document.getElementById("box").appendChild(pos);
            let def = document.createElement("p");
            def.innerHTML = data[i].meanings[j].definitions[0].definition;
            console.log(def.innerHTML);
            document.getElementById("box").appendChild(def);
          }
        }
        resizeDiv();
    })
  }
})

function resizeDiv(){
  let div = document.getElementById("box");
  div.style.height = "auto";
  div.style.height = div.scrollHeight + "px";
}