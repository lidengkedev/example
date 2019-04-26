window.onload = function () {
	var timer = null;
    var app = new Vue({
        el: '#app',
        data: {
            thead: [
                { id: 1, title: '选择' },
                { id: 2, title: '工序' },
                { id: 3, title: '拆分批次' }
            ],
            tbody: [
                { id: 1, value: true, name: 'SMT', branch: 1, num: 5000, factory: [] },
                { id: 2, value: true, name: 'DIP', branch: 1, num: 345, factory: [] },
                { id: 3, value: true, name: '功能测试', branch: 1, num: 5000, factory: [] },
                { id: 4, value: true, name: '三防漆', branch: 1, num: 2222, factory: [] },
                { id: 5, value: true, name: '组装', branch: 1, num: 3333, factory: [] }
            ],
            work_thead: [
                { id: 1, title: '工序' },
                { id: 2, title: '数量' },
                { id: 3, title: '指派工厂' }
            ],
            SMT: [
                { id: 1, name: 'SMT', total: 5000, branch: 1, num: 5000, value: '' }
            ],
            DIP: [
                { id: 1, name: 'DIP', total: 5000, branch: 1, num: 5000, value: 0 }
            ],
            TEST: [
                { id: 1, name: '功能测试', total: 5000, branch: 1, num: 5000, value: 0 }
            ],
            PAINT: [
                { id: 1, name: '三防漆', total: 5000, branch: 1, num: 5000, value: 0 }
            ],
            ASE: [
                { id: 1, name: '组装', total: 5000, branch: 1, num: 5000, value: 0 }
            ]
        },
        methods: {
        	// checkbox改变选择
        	checkboxChange (value, type) {
        		this.setProcedureChange(type, value);
        		if (!value) {
        			this.setAddProcedure(type);
        		} else {
        			this.setRemoveProcedure(type);
        		}
        	},
        	// 选中工序选项
        	setProcedureChange (type, value, branch) {
        		var num = parseInt(branch || 1);
        		let data = this.tbody;
    			for (let i = 0, len = data.length; i < len; i++) {
    				if (data[i].name === type && value === null) {
    					data[i].branch = num;
    				} else if (data[i].name === type && value != null) {
    					data[i].value = !value;
    					data[i].branch = value ? 0 : num;
    				}
    			}
        	},
        	// 添加工序
        	setAddProcedure (type, value) {
        		var value = value || 1, new_data = [];
        		for (let i = 0; i < value; i++) {
        			if (i < value) {
        				let procedure = this.setProcedureNumber(type, value, i);
        				new_data.push({ id: i, name: type, total: procedure.total, num: procedure.num, branch: procedure.branch, value: 0 })
        			}
        		}
        		if (type === "SMT") {
        			this.SMT = new_data;
        		} else if (type === "DIP") {
        			this.DIP = new_data;
        		} else if (type === "功能测试") {
        			this.TEST = new_data;
        		} else if (type === "三防漆") {
        			this.PAINT = new_data;
        		} else if (type === "组装") {
        			this.ASE = new_data;
        		}
        	},
        	// 删除工序
        	setRemoveProcedure (type, value) {
        		let new_data = [];
        		if (type === "SMT") {
        			this.SMT = new_data;
        		} else if (type === "DIP") {
        			this.DIP = new_data;
        		} else if (type === "功能测试") {
        			this.TEST = new_data;
        		} else if (type === "三防漆") {
        			this.PAINT = new_data;
        		} else if (type === "组装") {
        			this.ASE = new_data;
        		}
        	},
        	// 拆分工序批次
        	inputBatchchange (type, value) {
        		var value = parseInt(value || 1);
        		timer = setTimeout(() => {
        			if (value > 0 && value < 3) {
        				this.setAddProcedure(type, value);
        				this.setProcedureChange(type, null, value);
        			} else if (value < 1) {
        				this.setAddProcedure(type, 1);
        				this.setProcedureChange(type, null, 1);
        			} else if (value > 2) {
        				this.setAddProcedure(type, 2);
        				this.setProcedureChange(type, null, 2);
        			}
        		},0);
        	},
        	// 计算拆分工序的数量
        	setProcedureNumber (type, value, index) {
        		let data = this.tbody, num = 0, total = 0, branch = 0;
        		for (let i = 0, len = data.length; i < len; i++) {
        			// 如果当前工序的拆分批次为1,则工序数量不拆分
        			if (type === data[i].name && value == 1) {
        				num = data[i].num;
        			// 如果当前工序的拆分批次为2,则工序数量拆分
        			} else if (type === data[i].name && value == 2 ) {
        				// 拆分数量,第一个值下取整,第二个值向上取整
        				num = index == 0 ? Math.floor(parseInt(data[i].num)/2) : Math.ceil(parseInt(data[i].num)/2);
        			}
        			total = data[i].total;
        			branch = data[i].branch;
        		}
        		return {total, num, branch};
        	},
        	// 设置工序数量选择
        	procedureNumberChange (item) {
        		if (item.name === "SMT") {
        			this.checkProcedureNumber(this.SMT, item);
        		} else if (item.name === "DIP") {
        			this.checkProcedureNumber(this.DIP, item);
        		} else if (item.name === "功能测试") {
        			this.checkProcedureNumber(this.TEST, item);
        		} else if (item.name === "三防漆") {
        			this.checkProcedureNumber(this.PAINT, item);
        		} else if (item.name === "组装") {
        			this.checkProcedureNumber(this.ASE, item);
        		}
        	},
        	// 检查同一工序的数量
        	checkProcedureNumber (data, item) {
        		let value = 0;
        		for (let i = 0, len = data.length; i < len; i++) {
        			value += item.id == data[i].id ? item.value : data[i].value;
        			if (item.id != data[i].id) {
        				data[i].value = Math.ceil(data[i].total/data[i].branch) - item.value;
        			}
        		}
        	},
        	// 指派工厂
        	factoryChange (options) {
        		var value = options.value || 0;
        		if (options.name === "SMT") {
        			this.checkFactory(this.SMT, options);
        		} else if (options.name === "DIP") {
        			this.checkFactory(this.DIP, options);
        		} else if (options.name === "功能测试") {
        			this.checkFactory(this.TEST, options);
        		} else if (options.name === "三防漆") {
        			this.checkFactory(this.PAINT, options);
        		} else if (options.name === "组装") {
        			this.checkFactory(this.ASE, options);
        		}
        	},
        	// 同一道工序不可选择同一工厂
        	checkFactory (data, options) {
        		for (let i = 0, len = data.length; i < len; i++) {
        			if (data[i].id != options.id && data[i].value == options.value) {
        				options.value = '';
        			}
        		}
        	},
        	// 获取工厂列表
        	getFactoryList () {
        		let data = this.tbody, factoryList = [
        			{ id: 1, name: 'A', disable: false },
        			{ id: 2, name: 'B', disable: false },
        			{ id: 3, name: 'C', disable: false },
        			{ id: 4, name: 'D', disable: false },
        			{ id: 5, name: 'E', disable: false },
        			{ id: 6, name: 'F', disable: false }
        		];
        		for (let i = 0, len = data.length; i < len; i++) {
        			data[i].factory = factoryList;
        		}
        	},
        	// 工序提交
        	procedureSubmmit () {
        		// [{ process: 1, new_process: 1, num: 3000, factory_id: 1, batch: 1 }]
        		// process: 原工序
        		// new_process: 新工序
        		// num: 工序数量
        		// factory: 指派工厂
        		// batch: 拆分批次
        		let tbody = this.tbody, new_data = [];
        		for (let i = 0, len = tbody.length; i < len; i++) {
        			// 判断用户是否选择工序,未选择的工序不提交
        			if (tbody[i].value) {
        				if (tbody[i].name === "SMT") {
		        			this.dealProcedure(new_data, tbody[i], this.SMT);
		        		} else if (tbody[i].name === "DIP") {
		        			this.dealProcedure(new_data, tbody[i], this.DIP);
		        		} else if (tbody[i].name === "功能测试") {
		        			this.dealProcedure(new_data, tbody[i], this.TEST);
		        		} else if (tbody[i].name === "三防漆") {
		        			this.dealProcedure(new_data, tbody[i], this.PAINT);
		        		} else if (tbody[i].name === "组装") {
		        			this.dealProcedure(new_data, tbody[i], this.ASE);
		        		}
        			}
        		}
        		console.log(new_data)
        	},
        	// 整理提交的工序
        	dealProcedure (old, data, procedure) {
        		let new_data = [], new_procedure = [];
        		for (let i = 0, len = procedure.length; i < len; i++) {
        			new_procedure.push({ num: procedure[i].num, factory: procedure[i].value })
        		}
        		for (let i = 0; i < data.branch; i++) {
        			old.push({ process: data.id, new_process: data.id, num: new_procedure[i].num, factory: new_procedure[i].factory, batch: data.branch })
        		}
        	},
        	// 返回
        	goBack () {
        		window.history.go(-1);
        	}
        },
        mounted () {
        	this.getFactoryList();
        }
    });
}