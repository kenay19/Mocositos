 class Cards {

    createCardPediatra(nodeParent,nodeContainer,data) {
        if(nodeParent.contains(nodeContainer)){
            nodeParent.removeChild(nodeContainer);
        }
        const ul = document.createElement('ul').className('cards');
        let li;
        for(let i = 0; i < data.length; i++) {
            li = this.createLi(data[i]);
            ul.appendChild(li);
        }

        nodeParent.appendChild(ul);
    }

    createLi(data) {
        const li = document.createElement('li');
        const a = document.createElement('a').href(data.direccion).className('card');
        const img1 = document.createElement('img').src('https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2022/02/list-gc56dfd794_1280.png').className('card_image');
        const div1 = document.createElement('div').className('card_overlay');
        const div2 = document.createElement('div').className('card_header');
        const svg = document.createElement('svg').className('card_arc').xmlns('http://www.w3.org/2000/svg');
        const img2 = document.createElement('img').src('https://assets.nationbuilder.com/themes/5f3bc4644764e86d9ee8849f/attachments/original/1589382138/login.png?1589382138');
        const div3 = document.createElement('div').className('card_header-text');
        const h3 = document.createElement('h3').className('card_title').appendChild(document.createTextNode(data.nombre + data.app + data.apm));
        const span = document.createElement('span').className('card_status').appendChild(document.createTextNode(data.horario));
        div3.appendChild(h3);
        div3.appendChild(span);

        div2.appendChild(svg);
        div2.appendChild(img2);
        div2.appendChild(div3);

        div1.appendChild(div2);

        a.appendChild(img1);
        a.appendChild(div1);

        li.appendChild(a);

        return li;
    }

}