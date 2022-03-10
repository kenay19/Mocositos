class Table{

    createTableEmplado(nodeParent,nodeContainer,data) {
        if(nodeParent.contains(nodeContainer)){
            nodeParent.removeChild(nodeContainer);
        }
        const tbody = document.createElement('tbody');
        let tr;
        for(let i = 0; i < data.length; i++) {
            td = this.createTr(data[i]);
            tr.appendChild(td);
        }
        nodeParent.appendChild(tbody);
    }

    createTr(data) {
        for(let i = 0; i < data.length; i++) {
            tr = this.createTd(data[i]);
            tr.appendChild(td);
        }
    }

    createTd(data) {
        const td = document.createElement('td');
        if(object.keys(data)== idMedico)

    }
}