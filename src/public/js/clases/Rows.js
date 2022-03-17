class Rows{

    createTableEmplado(nodeParent,nodeContainer,data) {
        if(nodeParent.contains(nodeContainer)) {
            nodeParent.removeChild(nodeContainer);
        }
        const tbody = document.createElement('tbody');
        let tr;
        for(let i = 0 ; i < Object.keys(data).length ; i++) {
            tr = this.createTr(data[Object.keys(data)[i]]);
            tbody.appendChild(tr);
        }
        nodeParent.appendChild(tbody);
    }


    createTr(data) {
        const tr = document.createElement('tr');
        let td ;
        for(let i = 0 ; i < Object.keys(data).length ;i++) {
            td = this.createTd(data[Object.keys(data)[i]]);
            tr.appendChild(td);
        }
        td = document.createElement('td');
        let a = document.createElement('a');
        let i = document.createElement('i');
        i.setAttribute('class','fas fa-sync-alt');
        i.setAttribute('align', 'center');
        a.setAttribute('type','submit');
        a.setAttribute('class','btn btn-success');
        a.setAttribute('href','/admin/modify?id='+data['idMedico']);
        a.appendChild(i);
        td.appendChild(a);
        tr.appendChild(td);

        let td1 = document.createElement('td');
        let a1= document.createElement('a');
        let i1 = document.createElement('i');
        i1.setAttribute('class','far fa-trash-alt');
        i1.setAttribute('align', 'center');
        a1.setAttribute('type','submit');
        a1.setAttribute('class','btn btn-warning');
        a1.setAttribute('href','/admin/delete/'+data['idMedico']);
        a1.appendChild(i1);
        td1.appendChild(a1);
        tr.appendChild(td1);
        return tr
    }

    createTd(data) {
        const td = document.createElement('td');
        td.appendChild(document.createTextNode(data));
        td.setAttribute('align','center');
        return td;
    }

    createTableAntigeno(nodeParent,nodeContainer,data) {
        if (nodeParent.contains(nodeContainer)) {
            nodeParent.removeChild(nodeContainer);
        }
        const tbody = document.createElement('tbody');
        for(let i = 0 ; i < Object.keys(data).length ; i++) {
            tbody.appendChild(this.createRow(data[Object.keys(data)[i]]));
        }
        nodeParent.appendChild(tbody);

    }

    createRow(data) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(data.comun));
        const td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(data.cientifico));
        
        const td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(data.score1));
        const td4 = document.createElement('td');
        td4.appendChild(document.createTextNode(data.score2));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        return tr;
    }

}