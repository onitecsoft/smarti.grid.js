var smarti = window['smarti'] || {};

$(function () {
    if (!smarti.initialized) {
        smarti.initialized = true;
        smarti.init();
    }
})

smarti.init = function () {
    $.each($('[data-smarti]'), function () {
        var jq = $(this);
        var opts = jq.data();
        window[opts.name] = new smarti[opts['smarti']](jq, opts);
    });
}

smarti.ico = {
	desc: '<svg width="6" height="6"><path d="M3,0 L6,6 L0,6 Z" /></svg>',
	asc: '<svg width="6" height="6"><path d="M3,6 L0,0 L6,0 Z" /></svg>'
}

smarti.grid = function (jq, opts) {
	var that = this;
	$.extend(that, opts);
	this.data = this.data || [];
	this.selectClass = this.selectClass || 'selected';

	this.container = jq.attr('id', this.name);
	this.table = this.container.children('table');
	this.thead = this.table.children('thead');
	this.tbody = this.table.children('tbody');
	this.tfoot = this.table.children('tfoot');
	this.headerTemplate = this.thead.children().remove();
	this.groupHeaderTemplate = this.tbody.children('[data-group-header]').remove();
	this.groupFooterTemplate = this.tbody.children('[data-group-footer]').remove();
	this.rowTemplate = this.tbody.children().remove().attr('data-i', 'true');
	this.footerTemplate = this.tfoot.children().remove();

	that.tbody.on('click', '[data-s]', function (e) {
	    if (that.selectable) {
	        that.select($(this), that.selectable == 'multiple');
	        e.stopPropagation();
	    }
	}).on('click', '[data-i]', function (e) {
	    if (that.onClick != null) {
	        var arg = { sender: that, tr: $(this) };
	        arg.item = that.data[arg.tr.data('i')];
	        that.onClick(arg);
	        e.stopPropagation();
	    }
	}).on('click', '[data-e]', function (e) {
		if (that.editable) {
			/*var jq = $(this);
			var j = jq.data('e');
			var tr = jq.closest('tr');
			var i = tr.data('i');
			if (that._editor == null || that._editor.i != i || that._editor.j != j) {
			    var edit = that._editors[j](that.data[i]);
			    if (edit != null) {
			        if (that._editor != null) that._editor.tr.replaceWith(that._body(that._editor.i, that.data[that._editor.i]));
			        that._editor = { i: i, j: j, edit: edit, tr: tr };
			        if (jq.css('position') != 'absolute') jq.css({ position: 'relative' });
			        jq.html(edit.css({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }));
			        //
			        //edit.css({ position: 'absolute', top: 0, left: 0 });
			        /*.off('change').on('change', function () {
                        $.proxy(that._savers[j], edit)(that.data[i]);
                        tr.after(that._body(i, that.data[i])).remove();
                        that._editing = false;
                    })
                    .off('blur').on('blur', function () { edit.remove(); that._editing = false; })
                    .off('keydown').on('keydown', function (e) {
                        if (e.keyCode == 27) { edit.remove(); that._editing = false; }
                        if (e.keyCode == 9) {  }
                    });
			        //jq.append(edit);
			        edit.focus();
			        //that._editing = true;
			    }
			}
			e.stopPropagation();*/
		}
	});

	if (this.scrollable) {
		var table = this.table.css({ margin: 0 }).clone().children().remove().end().css({ position: 'absolute', left: 0, width: 'auto' });
		if (this.container.css('position') != 'absolute') this.container.css({ position: 'relative' });
		this.table.wrap('<div style="overflow-y:scroll;height:100%"></div>');
		this.container.append(table.clone().css({ top: 0 }).html(this.thead));
		this.container.append(table.clone().css({ bottom: 0 }).html(this.tfoot));
		$(window).resize(function () { that._fixScrollable() });
	}

	this.init = function () {
		that.sorting = {};
		that.grouping = {};
		that.thead.html(that.headerTemplate.clone()).add(that.tfoot.html(that.footerTemplate.clone())).find('*').each(function () {
			var jq = $(this);
			var d = jq.data();
			if (d.sortField != null) {
				if (jq.css('position') != 'absolute') jq.css({ position: 'relative' });
				jq.click(function () { that.sort(d.sortField); }).css({ cursor: 'pointer' });
			}
			if (d.sort != null) that.sorting[d.sortField] = d.sort;
			if (d.aggregate != null) jq.data('format', this.innerHTML);
			if (d.method) jq.data('method', eval('(' + this.innerHTML + ')'));
			if (d.select) jq.click(function () { that.selectAll(); }).html('<input type="checkbox" onclick="this.checked=!this.checked"/>');
		});
		if (that.scrollable) {
			that.table.children('thead,tfoot').remove();
			that.table.prepend(that.thead.clone().css({ visibility: 'hidden' }).find('[id]').removeAttr('id').end());
			that.table.append(that.tfoot.clone().css({ visibility: 'hidden' }).find('[id]').removeAttr('id').end());
		}
		that._editors = [];
		that._savers = [];
		that._body = that._template(that.rowTemplate);
		that._ghead = [];
		for (var i = 0; i < that.groupHeaderTemplate.length; i++) {
			var t = that.groupHeaderTemplate.filter('[data-group-header=' + i + ']');
			if (t.length > 0) that._ghead.push(that._template(t));
		}
		that._gfoot = [];
		for (var i = 0; i < that.groupFooterTemplate.length; i++) {
			var t = that.groupFooterTemplate.filter('[data-group-footer=' + i + ']');
			if (t.length > 0) that._gfoot.push(that._template(t));
		}
		that.load();
		if (that.onInit != null) that.onInit({ sender: that });
	}
	this.load = function (data) {
		if (arguments.length > 0) that.data = data || [];

		//sorting
		that.sorting = $.extend({}, that.grouping, that.sorting);
		that.thead.find('[data-s]').remove();
		for (var s in that.sorting) {
			var ico = $(smarti.ico[that.sorting[s]]).css({ position: 'absolute', left: 3, top: 3 }).attr('data-s', '');
			that.thead.children().children('[data-sort-field=' + s + ']').append(ico);
		}
		that._sort(that.data, that.sorting);

		//header and footer
		var hf = that.scrollable ? that.table.children('thead,tfoot').find('[data-aggregate],[data-method]') : null;
		that.thead.add(that.tfoot).find('[data-aggregate],[data-method]').each(function (k, v) {
			var d = $(v).data();
			if (d.aggregate != null) this.innerHTML = smarti.format(d.format, that.aggregate(that.data)[d.aggregate](d.field));
			else if (d.method) this.innerHTML = d.method(that.aggregate(that.data));
			if (hf != null && hf.length > 0) hf.eq(k)[0].innerHTML = this.innerHTML;
		});

		//body
		var body = '';
		var groups = {};
		for (var i in that.data) {
			var a = null;
			var k = 0;
			for (var j in that.grouping) {
				a = [k, that.data[i][j]];
				if (groups[a] == null) groups[a] = { level: k, rows: [], body: '', value: that.data[i][j] };
				groups[a].rows.push(that.data[i]);
				k++;
			}
			if (a != null) groups[a].body += that._body(i, that.data[i]);
			else body += that._body(i, that.data[i]);
		}
		for (var i in groups) {
		    var gh = that._ghead[groups[i].level];
		    var gf = that._gfoot[groups[i].level];
		    if (gh != null) body += gh(groups[i].level, that.aggregate(groups[i].rows, groups[i].value));
		    body += groups[i].body;
		    if (gf != null) body += gf(groups[i].level, that.aggregate(groups[i].rows, groups[i].value));
		}
		that.tbody.html(body);

		//post processing
		if (that.scrollable) that._fixScrollable();
		if (that.onLoad != null) that.onLoad({ sender: that });
		if (that.onSelect != null) that.onSelect({ sender: that });
	}
	this.selectAll = function (select) {
		var chk = that.thead.children().children('[data-select]').children(':checkbox');
		if (select == null) select = !chk.is(":checked");
		chk.prop('checked', select);
		that.select(select ? that.tbody.children('[data-i]') : null);
	}
	this.select = function (jq, toggle) {
		if (!toggle) {
			var rows = that.tbody.children('.' + that.selectClass).removeClass(that.selectClass);
			rows.find('[data-s]>:checkbox').prop('checked', false);
		}
		var e = { sender: that };
		if (jq != null && jq.length > 0) {
			e.tr = jq.is('tr') ? jq : jq.closest('tr');
			if (e.tr.length == 1) {
				var i = e.tr.data('i');
				e.tr = e.tr.add(that.tbody.children('[data-i=' + i + ']'));
				e.selected = !e.tr.hasClass(that.selectClass);
				e.item = that.data[i];
			}
			e.tr.toggleClass(that.selectClass);
			e.tr.each(function () { $(this).find('[data-s]>:checkbox').prop('checked', $(this).hasClass(that.selectClass)); });
		}
		if (that.onSelect != null) that.onSelect(e);
	}
	this.selectedItems = function () {
		var i = {};
		that.tbody.children('.' + that.selectClass).each(function () { i[$(this).data('i')] = null; });
		return $.map(i, function (v, k) { return that.data[k]; });
	}
	this.sort = function (field) {
		var dir = that.sorting[field] || 'desc';
		that.sorting = {};
		that.sorting[field] = dir == 'asc' ? 'desc' : 'asc';
		that.load();
	}
	this.aggregate = function (data, value) {
		var a = {};
		a.value = function () { return value; }
		a.first = function (f) { return data.length > 0 ? data[0][f] : ''; }
		a.last = function (f) { return data.length > 0 ? data[data.length - 1][f] : ''; }
		a.count = function () { return data.length; }
		a.sum = function (f) { var s = 0; $.each(data, function () { s += this[f] || 0; }); return s; }
		a.min = function (f) { var arr = a._arr(f); that._sort(arr); return arr[0] != null ? arr[0] : ''; }
		a.max = function (f) { var arr = a._arr(f); that._sort(arr, 'desc'); return arr[0] != null ? arr[0] : ''; }
		a.avg = function (f) { var c = a.count(); return c > 0 ? a.sum(f) / c : 0; }
		a._arr = function (f) { return $.map(data, function (v) { return v[f]; }); }
		return a;
	}
	this._template = function (template) {
		var p = [];
		var t = $('<div>').append(template.clone()).find('*').each(function () {
			var jq = $(this);
			var d = jq.data();
			var c = this.innerHTML;
			if (d.i) jq.attr('data-i', "'+k+'");
			if (d.select) {
				jq.removeAttr('data-select').attr('data-s', '');
				if (!jq.is('tr')) jq.html('<input type="checkbox"/>');
			}
			if (d.groupField != null) that.grouping[d.groupField] = d.group || 'asc';
			if (d.aggregate != null) {
				p.push(function (v) { return smarti.format(c, v[d.aggregate](d.field)) });
				jq.removeAttr('data-aggregate').html("'+p[" + (p.length - 1) + "](v)+'");
			}
			else if (d.field != null) {
				p.push(function (v) { return smarti.format(c, v[d.field]) });
				jq.removeAttr('data-field').html("'+p[" + (p.length - 1) + "](v)+'");
			}
			if (d.method) {
				p.push(eval('(' + c + ')'));
				jq.removeAttr('data-method').html("'+p[" + (p.length - 1) + "](v)+'");
			}
			if (d.attr != null) {
				var f = eval('(' + d.attr + ')');
				p.push(function (v) { var a = ''; var b = f(v); for (var i in b) { a += i + '="' + b[i] + '"'; } return a; });
				jq.attr('data-attr', p.length - 1);
			}
			if (d.edit != null) {
				that._editors.push(eval('(' + d.edit + ')'));
				that._savers.push(eval('(' + d.save + ')'));
				jq.removeAttr('data-edit').attr('data-e', that._editors.length - 1);
			}
		}).end()[0].innerHTML.replace(/\r|\n|\t|data-attr="([0-9]+)"|'\+[^\+]+\+'|'/g, function (x, y) {
			if (x == "'") return "\\'";
			else if (x.indexOf("'+") == 0) return x;
			else if (x.indexOf('data-attr="') == 0) return "'+p[" + y + "](v)+'";
			else return '';
		});
		return eval("(function(k,v){return'" + t + "'})");
	}
	this._sort = function (a, s) {
		if (s == null || typeof s == 'string') {
			var d = s == 'desc' ? -1 : 1;
			a.sort(function (x, y) { return ((x > y) - (y > x)) * d; });
		}
		else if (!$.isEmptyObject(s)) {
			a.sort(function (x, y) {
				for (var i in s) {
					var d = s[i] == 'desc' ? -1 : 1;
					var xx = x[i] || '';
					var yy = y[i] || '';
					var r = ((xx > yy) - (yy > xx)) * d;
					if (r != 0) return r;
				}
			});
		}
	},
	this._eval = function (k) {
		if (typeof that[k] == 'string') eval('that.' + k + '=' + (that[k] != '' ? that[k] : 'null'));
	}
	this._fixScrollable = function () {
		that.table.children('thead').find('th').each(function (k, v) {
			that.thead.find('th').eq(k).width($(v).width());
		});
		that.table.children('tfoot').find('td').each(function (k, v) {
			that.tfoot.find('td').eq(k).width($(v).width());
		});
	}

	this._eval('onSelect');
	this._eval('onLoad');
	this._eval('onInit');
	this._eval('onClick');
	this._eval('data');
	this.init();
	return this;
}
