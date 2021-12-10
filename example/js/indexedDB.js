import '../css/common.css'
import '../css/indexedDB.css'

class Sql {
    constructor() {
        this.db = null
        this.request = null
    }
    connect(sql, version) {
        return new Promise((resolve, reject) => {
            this.request = window.indexedDB.open(sql, version)
            this.request.onsuccess = (e) => {
                resolve(e)
                this.db = this.request.result
                this.success(e, '数据库打开成功')
            }
            this.request.onerror = (e) => {
                reject(e)
                this.error(e, '数据库打开报错')
            }
            this.request.onupgradeneeded = (e) => {
                this.db = e.target.result
                resolve(e)
                this.success(null, '数据库升级成功')
            }
        })
    }
    upgrad(e) {
        this.db = e.target.result
    }
    add (sql, value) {
        const request = this.db.transaction([sql], 'readwrite')
            .objectStore(sql)
            .add(value)
        request.onsuccess = (e) => {
            this.success(e, '数据写入成功')
        }
        request.onerror = (e) => {
            this.error(e, '数据写入失败')
        }
    }
    get(sql, value) {
        return new Promise((resolve, reject) => {
            const request = this.db
                .transaction([sql])
                .objectStore(sql)
                .get(value)
            request.onsuccess = () => {
                resolve(request.result)
                this.success.call(this, request.result)
            }
            request.onerror = this.error.call(this, '获取失败')
        })
    }
    update(sql, value) {
        const request = this.db
            .transaction([sql], 'readwrite')
            .objectStore(sql)
            .put(value)
        request.onsuccess = this.success.call(this, '数据更新成功')
        request.onerror = this.error.call(this, '数据更新失败')
    }
    delete(sql, value) {
        const request = this.db
            .transaction([sql], 'readwrite')
            .objectStore(sql)
            .delete(value)
        request.onsuccess = this.success.call(this, '数据删除成功')
        request.onerror = this.error.call(this, '数据删除失败')
    }
    cursor(tableName) {
        return new Promise((resolve, reject) => {
            if (this.hasObjectStoreNames(tableName)) {
                const request = this.db
                    .transaction([tableName])
                    .objectStore(tableName)
                    .openCursor()
                request.onsuccess = (e) => {
                    resolve(e.target.result)
                    this.success(e, '遍历表数据成功')
                }
                request.onerror = (e) => {
                    reject(e)
                    this.error(e, '遍历表数据失败')
                }
            } else {
                reject('表不存在')
            }
        }) 
    }
    createIndex(sql, value) {
        this.db
            .transaction([sql], 'readonly')
            .objectStore(sql)
            .index(value)
    }
    getIndex(sql, key, value) {
        return new Promise((resolve, reject) => {
            const request = this.db
                .transaction([sql], 'readonly')
                .objectStore(sql)
                .index(key)
                .get(value)
            request.onsuccess = (e) => {
                const result = e.target.result
                if (result) {
                    resolve(result)
                } else {
                    reject(e)
                }
            }
            request.onerror = () => {
                reject(e)
                this.error.call(this, '获取索引失败')
            }
        })
    }

    hasObjectStoreNames(name) {
        if (this.db.objectStoreNames.contains(name)) {
            this.success(null, `${name} 表已存在`)
            return true
        } else {
            this.error(null, `${name} 表不存在`)
            return false
        }
    }

    create(name, data, options = { keyPath: false }) {
        if (!this.db.objectStoreNames.contains(name)) {
            let objectStore = null
            if (options.keyPath) {
                objectStore = this.db.createObjectStore(name, { keyPath: options.keyPath })
            } else {
                objectStore = this.db.createObjectStore(name, { autoIncrement: true })
            }
            data.forEach(item => {
                objectStore.createIndex(item.name, item.name, { unique: item.unique })
            })
        }
    }

    success(e, message) {
        console.log(e, message || 'success')
    }
    error(e, message) {
        console.log(e, message || 'error')
    }
}
var sql = null
window.onload = function () {
    sql = new Sql()
    sql.connect('database', 1).then(res => {
        if (sql.hasObjectStoreNames('person')) {
            const request = sql.db.transaction(['person']).objectStore('person').getAll()
            request.onsuccess = function () {
                const data = request.result
                const tbody = table.getElementsByTagName('tbody')[0]
                data.sort((a,b) => Number(a.id) - Number(b.id)).forEach(item => {
                    const { id, name, age, email } = item
                    const tr = document.createElement('tr')
                    const tbodyContent =
                        `<td align="center">${id}</td>
                        <td align="center">${name}</td>
                        <td align="center">${age}</td>
                        <td align="center">${email}</td>`
                    tr.innerHTML = tbodyContent
                    tbody.appendChild(tr)
                })
            }
        } else {
            const tableData = [
                { name: 'id', unique: false },
                { name: 'name', unique: false },
                { name: 'age', unique: false },
                { name: 'email', unique: true }
            ]
            sql.create('person', tableData, { keyPath: 'id' })
        }
    })
    const idElem = document.getElementById('id')
    const nameElem = document.getElementById('name')
    const ageElem = document.getElementById('age')
    const emailElem = document.getElementById('email')

    const searchId = document.getElementById('search-id')
    const searchName = document.getElementById('search-name')
    const searchAge = document.getElementById('search-age')
    const searchEmail = document.getElementById('search-email')
    const addBtn = document.getElementById('add')
    const editBtn = document.getElementById('edit')
    const deleteBtn = document.getElementById('delete')
    const searchBtn = document.getElementById('search')
    const table = document.getElementById('table-tbody')

    function getTableData (params) {
        const data = []
        const request = sql.db.transaction(['person']).objectStore('person').openCursor()
        return new Promise((resolve, reject) => {
            request.onsuccess = function (e) {
                var cursor = e.target.result
                if (cursor) {
                    const row = cursor.value
                    const { id, name, age, email } = row
                    const keys = Object.keys(params).filter(item => Boolean(params[item]))
                    if (keys.length > 0 && keys.every(item => params[item] === row[item])) {
                        data.push({ id, name, age, email })
                    }
                    cursor.continue()
                }
                if (request.readyState === 'done') {
                    resolve(data)
                }
            }
            request.onerror = function (e) {
                reject(e)
            }
        })
    }

    function updateDom(tableName) {
        const request = sql.db.transaction([tableName]).objectStore(tableName).getAll()
        request.onsuccess = function () {
            const data = request.result
            const tbody = table.getElementsByTagName('tbody')[0]
            tbody.innerHTML = ''
            data.sort((a,b) => Number(a.id) - Number(b.id)).forEach(item => {
                const { id, name, age, email } = item
                const tr = document.createElement('tr')
                const tbodyContent =
                    `<td align="center">${id}</td>
                    <td align="center">${name}</td>
                    <td align="center">${age}</td>
                    <td align="center">${email}</td>`
                tr.innerHTML = tbodyContent
                tbody.appendChild(tr)
            })
        }
    }
    function resetFormData () {
        idElem.value = ''
        nameElem.value = ''
        ageElem.value = ''
        emailElem.value = ''
    }
    function handleAdd () {
        if (idElem.value) {
            sql.add('person', { id: idElem.value, name: nameElem.value, age: ageElem.value, email: emailElem.value })
            resetFormData()
            updateDom('person')
        } else {
            alert('请输入ID')
        }
    }
    function handleEdit () {
        if (idElem.value) {
            sql.db.transaction([sql], 'readwrite')
            .objectStore('person')
            .put({
                id: idElem.value,
                name: nameElem.value,
                age: ageElem.value,
                email: emailElem.value
            })
            resetFormData()
            updateDom('person')
        } else {
            alert('请输入ID')
        }
    }
    function handleDelete () {
        if (idElem.value) {
            sql.db.transaction(['person'], 'readwrite')
            .objectStore('person')
            .delete(idElem.value)
            resetFormData()
            updateDom('person')
        } else {
            alert('请输入ID')
        }
    }
    addBtn.onclick = handleAdd
    editBtn.onclick = handleEdit
    deleteBtn.onclick = handleDelete
    searchBtn.onclick = function () {
        const params = {
            id: searchId.value,
            name: searchName.value,
            age: searchAge.value,
            email: searchEmail.value
        }
        if (Object.keys(params).every(item => !Boolean(params[item]))) {
            updateDom('person')
        } else {
            getTableData(params).then(res => {
                const tbody = table.getElementsByTagName('tbody')[0]
                tbody.innerHTML = ''
                res.forEach(item => {
                    const { id, name, age, email } = item
                    const tr = document.createElement('tr')
                    const tbodyContent =
                        `<td align="center">${id}</td>
                        <td align="center">${name}</td>
                        <td align="center">${age}</td>
                        <td align="center">${email}</td>`
                    tr.innerHTML = tbodyContent
                    tbody.appendChild(tr)
                })
                console.log(res)
            })
        }
    }
}
