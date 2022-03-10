class Rows{

    createTableEmplado(nodeParent,nodeContainer,data) {
        if(nodeParent.constains(nodeContainer)) {
            nodeParent.removeChild(nodeContainer);
        }
        const tbody = document.createElement('tbody');
        let tr;
        for(let i = 0 ; i < Object.keys(data).length ; i++) {
            tr = this.createTr(data[Object.keys(data)[i]]);
            tbody.appendChild(tr);
        }
        nodeContainer.appendChild(tbody);
    }


    createTr(data) {
        const tr = document.createElement('tr');
        for(let i = 0 ; i < Object.keys(data).length ;i++) {
            tr.appendChild(this.createTd(data[Object.keys(data)[i]]));
        }
        let td = document.createElement('td');
        let a = document.createElement('a');
        let i = document.createElement('i');
        i.setAttribute('class','fas fa-sync-alt');
        a.setAttribute('type','submit');
        a.setAttribute('class','btn btn-success');
        a.setAttribute('href','/admin/modify?id='+data['idMedico']);
        tr.appendChild(td.appendChild(a.appendChild(i)));

        let td1 = document.createElement('td');
        let a1= document.createElement('a');
        let i1 = document.createElement('i');
        i.setAttribute('class','far fa-trash-alt');
        a.setAttribute('type','submit');
        a.setAttribute('class','btn btn-warning');
        a.setAttribute('href','/admin/delete?id='+data['idMedico']);
        tr.appendChild(td.appendChild(a.appendChild(i)));
        return tr
    }

    createTd(data) {
        const td = document.createElement('td');
        return td.appendChild(document.createTextNode(kdata));
    }

}