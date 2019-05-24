document.getElementById('button').onclick = () => {
  let wrd = document.getElementById('text').value;

  axios.get(`http://api.urbandictionary.com/v0/define?term=${wrd}`)
    .then(response => {
      console.log(response);
      let mainDiv = document.getElementById('card');

      document.getElementById('card').innerHTML = '';

      //if (response.data.list.length === 0) { return null }

      return response.data.list.forEach(item => {

        constructor = new DivConstructor(
          item.word,
          item.definition,
          item.author,
          item.thumbs_up,
          item.thumbs_down,
          item.timestamp
        );


        mainDiv.appendChild(constructor.outputDiv());
      });
    })  


}

document.getElementById('pirate').onclick = () => {

  let wrd = 'pirate';

  axios.get(`http://api.urbandictionary.com/v0/define?term=${wrd}`)
    .then(response => {
      console.log(response);
      let mainDiv = document.getElementById('card');

      document.getElementById('card').innerHTML = '';

      //if (response.data.list.length === 0) { return null }

      return response.data.list.forEach(item => {

        constructor = new DivConstructor(
          item.word,
          item.definition,
          item.example,
          item.author,
          item.thumbs_up,
          item.thumbs_down,
          item.written_on
        );


        mainDiv.appendChild(constructor.outputDiv());
      });
    })  

}

class DivConstructor {
  constructor(word, definition, example, author, upvotes, downvotes, timestamp) {
    this.word = word;
    this.definition = this.splitDefinition(definition);
    this.example = this.splitDefinition(example);
    this.author = author;
    this.upvotes = upvotes;
    this.downvotes = downvotes;
    this.timestamp = this.Time(timestamp);
  }


  splitDefinition(definition) {    
    let defArr = definition.replace('1.', '').replace(/\[/g, `<a class="link" href="#">`).replace(/\]/g, `</a>`).split(/\d\./g);
    let ol = document.createElement('ol');  
    defArr.map(el => {        
      let li = document.createElement('li');
      li.innerHTML = el;
      ol.appendChild(li)
    })
   
    return ol;

  }

  splitDefinition(example) {
    let exArr = example.replace('1.', '').replace(/\[/g, `<a class="link" href="#">`).replace(/\]/g, `</a>`).split(/\d\./g);
    let ol = document.createElement('ol');  
    exArr.map(el => {        
      let li = document.createElement('li');
      li.innerHTML = el;
      ol.appendChild(li)
    })
   
    return ol;

  }

  createDef() {
    let def = document.createElement('div');
    def.setAttribute('class', 'card__definition');
    def.appendChild(this.definition)

    return def;
  }


  createExamples() {
    let ex = document.createElement('p');
    ex.setAttribute('class', 'card__examples');
    ex.innerHTML = this.example;

    return ex;
  }


  createWord() {
    let h = document.createElement('h2');
    h.setAttribute('class', 'card__word');
    h.innerHTML = this.word;

    return h;

  }

  createAuthor() {
    let author = document.createElement('p');
    author.setAttribute('class', 'card__author');
    author.innerHTML = this.author;

    return author;

  }

  createLikes() {
    let likes = document.createElement('div');
    likes.setAttribute('class', 'card__likes');
    likes.appendChild(this.createLike());
    likes.appendChild(this.createDisLike());

    return likes;
  }

  createLike() {

    let like = document.createElement('div');
    like.setAttribute('class', 'card__like');
    like.innerHTML = this.upvotes;

    return like;

  }

  createDisLike() {

    let Dislike = document.createElement('div');
    Dislike.setAttribute('class', 'card__Dislike');
    Dislike.innerHTML = this.downvotes;

    return Dislike;

  }

  Time(timestamp) {
    let mainTime = new Date(timestamp);
    let string = `Publication time ${mainTime.getDate()}. ${mainTime.getMonth()}. ${mainTime.getFullYear()}`;
    return string;
  }
  

  createTime() {

    let time = document.createElement('div');
    time.setAttribute('class', 'card__time');
    time.innerHTML = this.timestamp;

    return time;

  }


  outputDiv() {
    let div = document.createElement('div');

    div.appendChild(this.createWord());
    div.appendChild(this.createDef());
    div.appendChild(this.createExamples());
    div.appendChild(this.createAuthor());
    div.appendChild(this.createLikes());
    div.appendChild(this.createTime());

    div.setAttribute('class', 'card');

    return div;
  }

}