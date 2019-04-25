window.onload = function () {
    var app = new Vue({
        el: '#app',
        data: {
            thead: [
                { id: 1, title: '选择' },
                { id: 2, title: '工序' },
                { id: 3, title: '拆分批次' }
            ],
            tbody: [
                { id: 1, name: 'SMT', value: 1 },
                { id: 2, name: 'DIP', value: 1 },
                { id: 3, name: '功能测试', value: 1 },
                { id: 4, name: '三防漆', value: 1 },
                { id: 5, name: '组装', value: 1 }
            ],
            work_thead: [
                { id: 1, title: '工序' },
                { id: 2, title: '数量' },
                { id: 3, title: '指派工厂' }
            ],
            SMT: [
                { id: 1, name: 'SMT', num: 5000, value: 0 },
                { id: 1, name: 'SMT', num: 5000, value: 0 }
            ],
            DIP: [
                { id: 1, name: 'DIP', num: 5000, value: 0 },
                { id: 1, name: 'DIP', num: 5000, value: 0 }
            ],
            TEST: [
                { id: 1, name: '功能测试', num: 5000, value: 0 },
                { id: 1, name: '功能测试', num: 5000, value: 0 }
            ],
            PAINT: [
                { id: 1, name: '三防漆', num: 5000, value: 0 },
                { id: 1, name: '三防漆', num: 5000, value: 0 }
            ],
            ASE: [
                { id: 1, name: '组装', num: 5000, value: 0 },
                { id: 1, name: '组装', num: 5000, value: 0 }
            ]
        }
    });
}