class inputs {

    createInputAntigeno(nodeParent,nodeContainer,before,data) {
        if(nodeParent.contains(nodeContainer)) {
            nodeParent.removeChild(nodeContainer);
        }
        for(let i = 0; i < data.length; i++) {
            nodeParent.insertBefore(this.createSpecificInput(data[i]),before );
        }
    }

    createSpecificInput(data) {
        const div = document.createElement('div');
        div.setAttribute('class','field padding-bottom--24');
        const label = document.createElement('label');
        label.setAttribute('for',data.idAntigeno);
        label.appendChild(document.createTextNode(data.comun));
        const input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('id',"antigeno"+data.idAntigeno);
        input.required=true;
        div.appendChild(label);
        div.appendChild(input);
        return div;
    }
}