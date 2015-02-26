function S4(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function guid(){return S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()}function Migrator(t,e){this.db=e,this.dbname=t.adapter.db_name,this.table=t.adapter.collection_name,this.idAttribute=t.adapter.idAttribute,this.column=function(t){var e=t.split(/\s+/),i=e[0];switch(i.toLowerCase()){case"string":case"varchar":case"date":case"datetime":Ti.API.warn('"'+i+'" is not a valid sqlite field, using TEXT instead');case"text":i="TEXT";break;case"int":case"tinyint":case"smallint":case"bigint":case"boolean":Ti.API.warn('"'+i+'" is not a valid sqlite field, using INTEGER instead');case"integer":i="INTEGER";break;case"double":case"float":case"decimal":case"number":Ti.API.warn('"'+t+'" is not a valid sqlite field, using REAL instead');case"real":i="REAL";break;case"blob":i="BLOB";break;case"null":i="NULL";break;default:i="TEXT"}return e[0]=i,e.join(" ")},this.createTable=function(t){var e=[],i=!1;for(var r in t.columns)r===this.idAttribute&&(i=!0),e.push(r+" "+this.column(t.columns[r]));i||this.idAttribute!==ALLOY_ID_DEFAULT||e.push(ALLOY_ID_DEFAULT+" TEXT UNIQUE");var n="CREATE TABLE IF NOT EXISTS "+this.table+" ( "+e.join(",")+")";this.db.execute(n)},this.dropTable=function(){this.db.execute("DROP TABLE IF EXISTS "+this.table)},this.insertRow=function(t){var e=[],i=[],r=[],n=!1;for(var o in t)o===this.idAttribute&&(n=!0),e.push(o),i.push(t[o]),r.push("?");n||this.idAttribute!==ALLOY_ID_DEFAULT||(e.push(this.idAttribute),i.push(guid()),r.push("?")),this.db.execute("INSERT INTO "+this.table+" ("+e.join(",")+") VALUES ("+r.join(",")+");",i)},this.deleteRow=function(t){var e="DELETE FROM "+this.table,i=_.keys(t),r=i.length,n=[],o=[];r&&(e+=" WHERE ");for(var a=0;r>a;a++)n.push(i[a]+" = ?"),o.push(t[i[a]]);e+=n.join(" AND "),this.db.execute(e,o)}}function Sync(t,e,i){var r,n,o=e.config.adapter.collection_name,a=e.config.columns,s=e.config.adapter.db_name||ALLOY_DB_DEFAULT,l=null;switch(t){case"create":case"update":l=function(){var t={};e.id||(e.id=e.idAttribute===ALLOY_ID_DEFAULT?guid():null,t[e.idAttribute]=e.id,e.set(t,{silent:!0}));var i=[],l=[],c=[];for(var u in a)i.push(u),l.push(e.get(u)),c.push("?");if(n="REPLACE INTO "+o+" ("+i.join(",")+") VALUES ("+c.join(",")+");",r=Ti.Database.open(s),r.execute("BEGIN;"),r.execute(n,l),null===e.id){var d="SELECT last_insert_rowid();",h=r.execute(d);h&&h.isValidRow()?(e.id=h.field(0),t[e.idAttribute]=e.id,e.set(t,{silent:!0})):Ti.API.warn("Unable to get ID from database for model: "+e.toJSON()),h&&h.close()}return r.execute("COMMIT;"),r.close(),e.toJSON()}();break;case"read":i.query&&i.id&&Ti.API.warn('Both "query" and "id" options were specified for model.fetch(). "id" will be ignored.'),n="SELECT * FROM "+o,i.query?n=i.query:i.id&&(n+=" WHERE "+(e.idAttribute?e.idAttribute:ALLOY_ID_DEFAULT)+" = "+(_.isString(i.id)?'"'+i.id+'"':i.id)),r=Ti.Database.open(s);var c;c=_.isString(n)?r.execute(n):r.execute(n.statement,n.params);for(var u=0,d=[];c.isValidRow();){var h={},p=0;p=_.isFunction(c.fieldCount)?c.fieldCount():c.fieldCount,_.times(p,function(t){var e=c.fieldName(t);h[e]=c.fieldByName(e)}),d.push(h),u++,c.next()}c.close(),r.close(),e.length=u,l=1===u?d[0]:d;break;case"delete":n="DELETE FROM "+o+" WHERE "+e.idAttribute+"=?",r=Ti.Database.open(s),r.execute(n,e.id),r.close(),e.id=null,l=e.toJSON()}l?(_.isFunction(i.success)&&i.success(l),"read"!==t||i.silent||e.trigger("fetch",{fromAdapter:!0})):_.isFunction(i.error)&&i.error(l)}function GetMigrationFor(t,e){var i=null,r=Ti.Database.open(t);r.execute("CREATE TABLE IF NOT EXISTS migrations (latest TEXT, model TEXT);");var n=r.execute("SELECT latest FROM migrations where model = ?;",e);return n.isValidRow()&&(i=n.field(0)+""),n.close(),r.close(),i}function Migrate(t){var e=t.migrations||[],i={};e.length&&e[e.length-1](i);var r=t.prototype.config;r.adapter.db_name=r.adapter.db_name||ALLOY_DB_DEFAULT;var n=new Migrator(r),o="undefined"==typeof r.adapter.migration||null===r.adapter.migration?i.id:r.adapter.migration;if("undefined"==typeof o||null===o){var a=Ti.Database.open(r.adapter.db_name);return n.db=a,n.createTable(r),void a.close()}o+="";var s,l=GetMigrationFor(r.adapter.db_name,r.adapter.collection_name);if(l!==o){if(l&&l>o?(s=0,e.reverse()):s=1,db=Ti.Database.open(r.adapter.db_name),n.db=db,db.execute("BEGIN;"),e.length)for(var c=0;c<e.length;c++){var u=e[c],d={};if(u(d),s){if(d.id>o)break;if(d.id<=l)continue}else{if(d.id<=o)break;if(d.id>l)continue}var h=s?"up":"down";_.isFunction(d[h])&&d[h](n)}else n.createTable(r);db.execute("DELETE FROM migrations where model = ?",r.adapter.collection_name),db.execute("INSERT INTO migrations VALUES (?,?)",o,r.adapter.collection_name),db.execute("COMMIT;"),db.close(),n.db=null}}function installDatabase(t){var e=t.adapter.db_file,i=t.adapter.collection_name,r=/(^|.*\/)([^\/]+)\.[^\/]+$/,n=e.match(r);if(null===n)throw'Invalid sql database filename "'+e+'"';t.adapter.db_name=t.adapter.db_name||n[2];var o=t.adapter.db_name;Ti.API.debug('Installing sql database "'+e+'" with name "'+o+'"');var a,s,l=Ti.Database.install(e,o),c=l.execute('pragma table_info("'+i+'");'),u={};if(c){for(;c.isValidRow();)a=c.fieldByName("name"),s=c.fieldByName("type"),u[a]=s,a!==ALLOY_ID_DEFAULT||t.adapter.idAttribute||(t.adapter.idAttribute=ALLOY_ID_DEFAULT),c.next();c.close()}else{t.adapter.idAttribute?t.adapter.idAttribute:ALLOY_ID_DEFAULT;for(var d in t.columns)a=d,s=t.columns[d],a!==ALLOY_ID_DEFAULT||t.adapter.idAttribute?d===t.adapter.idAttribute&&(s+=" UNIQUE"):t.adapter.idAttribute=ALLOY_ID_DEFAULT,u[a]=s}if(t.columns=u,t.adapter.idAttribute){if(!_.contains(_.keys(t.columns),t.adapter.idAttribute))throw'config.adapter.idAttribute "'+t.adapter.idAttribute+'" not found in list of columns for table "'+i+'"\ncolumns: ['+_.keys(t.columns).join(",")+"]"}else{Ti.API.info('No config.adapter.idAttribute specified for table "'+i+'"'),Ti.API.info('Adding "'+ALLOY_ID_DEFAULT+'" to uniquely identify rows');var h=[],p=[];_.each(t.columns,function(t,e){p.push(e),h.push(e+" "+t)});var f=p.join(",");l.execute("ALTER TABLE "+i+" RENAME TO "+i+"_temp;"),l.execute("CREATE TABLE "+i+"("+h.join(",")+","+ALLOY_ID_DEFAULT+" TEXT UNIQUE);"),l.execute("INSERT INTO "+i+"("+f+","+ALLOY_ID_DEFAULT+") SELECT "+f+",CAST(_ROWID_ AS TEXT) FROM "+i+"_temp;"),l.execute("DROP TABLE "+i+"_temp;"),t.columns[ALLOY_ID_DEFAULT]="TEXT UNIQUE",t.adapter.idAttribute=ALLOY_ID_DEFAULT}l.close()}var _=require("alloy/underscore")._,ALLOY_DB_DEFAULT="_alloy_",ALLOY_ID_DEFAULT="alloy_id",cache={config:{},Model:{}};module.exports.beforeModelCreate=function(t,e){if(cache.config[e])return cache.config[e];if("undefined"==typeof Ti.Database)throw"No support for Titanium.Database in MobileWeb environment.";return t.adapter.db_file&&installDatabase(t),t.adapter.idAttribute||(Ti.API.info('No config.adapter.idAttribute specified for table "'+t.adapter.collection_name+'"'),Ti.API.info('Adding "'+ALLOY_ID_DEFAULT+'" to uniquely identify rows'),t.columns[ALLOY_ID_DEFAULT]="TEXT UNIQUE",t.adapter.idAttribute=ALLOY_ID_DEFAULT),cache.config[e]=t,t},module.exports.afterModelCreate=function(t,e){return cache.Model[e]?cache.Model[e]:(t=t||{},t.prototype.idAttribute=t.prototype.config.adapter.idAttribute,Migrate(t),cache.Model[e]=t,t)},module.exports.sync=Sync;