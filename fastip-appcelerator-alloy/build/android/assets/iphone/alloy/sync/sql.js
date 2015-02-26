function S4(){return(0|65536*(1+Math.random())).toString(16).substring(1)}function guid(){return S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()}function Migrator(t,e){this.db=e,this.dbname=t.adapter.db_name,this.table=t.adapter.collection_name,this.idAttribute=t.adapter.idAttribute,this.column=function(t){var e=t.split(/\s+/),i=e[0];switch(i.toLowerCase()){case"string":case"varchar":case"date":case"datetime":Ti.API.warn('"'+i+'" is not a valid sqlite field, using TEXT instead');case"text":i="TEXT";break;case"int":case"tinyint":case"smallint":case"bigint":case"boolean":Ti.API.warn('"'+i+'" is not a valid sqlite field, using INTEGER instead');case"integer":i="INTEGER";break;case"double":case"float":case"decimal":case"number":Ti.API.warn('"'+t+'" is not a valid sqlite field, using REAL instead');case"real":i="REAL";break;case"blob":i="BLOB";break;case"null":i="NULL";break;default:i="TEXT"}return e[0]=i,e.join(" ")},this.createTable=function(t){var e=[],i=!1;for(var r in t.columns)r===this.idAttribute&&(i=!0),e.push(r+" "+this.column(t.columns[r]));i||this.idAttribute!==ALLOY_ID_DEFAULT||e.push(ALLOY_ID_DEFAULT+" TEXT UNIQUE");var o="CREATE TABLE IF NOT EXISTS "+this.table+" ( "+e.join(",")+")";this.db.execute(o)},this.dropTable=function(){this.db.execute("DROP TABLE IF EXISTS "+this.table)},this.insertRow=function(t){var e=[],i=[],r=[],o=!1;for(var n in t)n===this.idAttribute&&(o=!0),e.push(n),i.push(t[n]),r.push("?");o||this.idAttribute!==ALLOY_ID_DEFAULT||(e.push(this.idAttribute),i.push(guid()),r.push("?")),this.db.execute("INSERT INTO "+this.table+" ("+e.join(",")+") VALUES ("+r.join(",")+");",i)},this.deleteRow=function(t){var e="DELETE FROM "+this.table,i=_.keys(t),r=i.length,o=[],n=[];r&&(e+=" WHERE ");for(var s=0;r>s;s++)o.push(i[s]+" = ?"),n.push(t[i[s]]);e+=o.join(" AND "),this.db.execute(e,n)}}function Sync(t,e,i){var r,o,n=e.config.adapter.collection_name,s=e.config.columns,a=e.config.adapter.db_name||ALLOY_DB_DEFAULT,l=null;switch(t){case"create":case"update":l=function(){var t={};e.id||(e.id=e.idAttribute===ALLOY_ID_DEFAULT?guid():null,t[e.idAttribute]=e.id,e.set(t,{silent:!0}));var i=[],l=[],d=[];for(var c in s)i.push(c),l.push(e.get(c)),d.push("?");if(o="REPLACE INTO "+n+" ("+i.join(",")+") VALUES ("+d.join(",")+");",r=Ti.Database.open(a),r.execute("BEGIN;"),r.execute(o,l),null===e.id){var u="SELECT last_insert_rowid();",_=r.execute(u);_&&_.isValidRow()?(e.id=_.field(0),t[e.idAttribute]=e.id,e.set(t,{silent:!0})):Ti.API.warn("Unable to get ID from database for model: "+e.toJSON()),_&&_.close()}return r.execute("COMMIT;"),r.close(),e.toJSON()}();break;case"read":i.query&&i.id&&Ti.API.warn('Both "query" and "id" options were specified for model.fetch(). "id" will be ignored.'),o="SELECT * FROM "+n,i.query?o=i.query:i.id&&(o+=" WHERE "+e.idAttribute+" = "+i.id),r=Ti.Database.open(a);var d;d=_.isString(o)?r.execute(o):r.execute(o.statement,o.params);for(var c=0,u=[];d.isValidRow();){var h={},p=0;p=_.isFunction(d.fieldCount)?d.fieldCount():d.fieldCount,_.times(p,function(t){var e=d.fieldName(t);h[e]=d.fieldByName(e)}),u.push(h),c++,d.next()}d.close(),r.close(),e.length=c,l=1===c?u[0]:u;break;case"delete":o="DELETE FROM "+n+" WHERE "+e.idAttribute+"=?",r=Ti.Database.open(a),r.execute(o,e.id),r.close(),e.id=null,l=e.toJSON()}l?(_.isFunction(i.success)&&i.success(l),"read"!==t||i.silent||e.trigger("fetch",{fromAdapter:!0})):_.isFunction(i.error)&&i.error(l)}function GetMigrationFor(t,e){var i=null,r=Ti.Database.open(t);r.execute("CREATE TABLE IF NOT EXISTS migrations (latest TEXT, model TEXT);");var o=r.execute("SELECT latest FROM migrations where model = ?;",e);return o.isValidRow()&&(i=o.field(0)+""),o.close(),r.close(),i}function Migrate(t){var e=t.migrations||[],i={};e.length&&e[e.length-1](i);var r=t.prototype.config;r.adapter.db_name=r.adapter.db_name||ALLOY_DB_DEFAULT;var o=new Migrator(r),n="undefined"==typeof r.adapter.migration||null===r.adapter.migration?i.id:r.adapter.migration;if("undefined"==typeof n||null===n){var s=Ti.Database.open(r.adapter.db_name);return o.db=s,o.createTable(r),void s.close()}n+="";var a,l=GetMigrationFor(r.adapter.db_name,r.adapter.collection_name);if(l!==n){if(l&&l>n?(a=0,e.reverse()):a=1,db=Ti.Database.open(r.adapter.db_name),o.db=db,db.execute("BEGIN;"),e.length)for(var d=0;e.length>d;d++){var c=e[d],u={};if(c(u),a){if(u.id>n)break;if(l>=u.id)continue}else{if(n>=u.id)break;if(u.id>l)continue}var h=a?"up":"down";_.isFunction(u[h])&&u[h](o)}else o.createTable(r);db.execute("DELETE FROM migrations where model = ?",r.adapter.collection_name),db.execute("INSERT INTO migrations VALUES (?,?)",n,r.adapter.collection_name),db.execute("COMMIT;"),db.close(),o.db=null}}function installDatabase(t){var e=t.adapter.db_file,i=t.adapter.collection_name,r=/(^|.*\/)([^\/]+)\.[^\/]+$/,o=e.match(r);if(null===o)throw'Invalid sql database filename "'+e+'"';t.adapter.db_name=t.adapter.db_name||o[2];var n=t.adapter.db_name;Ti.API.debug('Installing sql database "'+e+'" with name "'+n+'"');var s=Ti.Database.install(e,n);!1===t.adapter.remoteBackup&&(Ti.API.debug('iCloud "do not backup" flag set for database "'+e+'"'),s.file.setRemoteBackup(!1));for(var a=s.execute('pragma table_info("'+i+'");'),l={};a.isValidRow();){var d=a.fieldByName("name"),c=a.fieldByName("type");l[d]=c,d!==ALLOY_ID_DEFAULT||t.adapter.idAttribute||(t.adapter.idAttribute=ALLOY_ID_DEFAULT),a.next()}if(t.columns=l,a.close(),t.adapter.idAttribute){if(!_.contains(_.keys(t.columns),t.adapter.idAttribute))throw'config.adapter.idAttribute "'+t.adapter.idAttribute+'" not found in list of columns for table "'+i+'"\ncolumns: ['+_.keys(t.columns).join(",")+"]"}else{Ti.API.info('No config.adapter.idAttribute specified for table "'+i+'"'),Ti.API.info('Adding "'+ALLOY_ID_DEFAULT+'" to uniquely identify rows');var u=[],h=[];_.each(t.columns,function(t,e){h.push(e),u.push(e+" "+t)});var p=h.join(",");s.execute("ALTER TABLE "+i+" RENAME TO "+i+"_temp;"),s.execute("CREATE TABLE "+i+"("+u.join(",")+","+ALLOY_ID_DEFAULT+" TEXT UNIQUE);"),s.execute("INSERT INTO "+i+"("+p+","+ALLOY_ID_DEFAULT+") SELECT "+p+",CAST(_ROWID_ AS TEXT) FROM "+i+"_temp;"),s.execute("DROP TABLE "+i+"_temp;"),t.columns[ALLOY_ID_DEFAULT]="TEXT UNIQUE",t.adapter.idAttribute=ALLOY_ID_DEFAULT}s.close()}var _=require("alloy/underscore")._,ALLOY_DB_DEFAULT="_alloy_",ALLOY_ID_DEFAULT="alloy_id",cache={config:{},Model:{}};module.exports.beforeModelCreate=function(t,e){if(cache.config[e])return cache.config[e];if("mobileweb"===Ti.Platform.osname||"undefined"==typeof Ti.Database)throw"No support for Titanium.Database in MobileWeb environment.";return t.adapter.db_file&&installDatabase(t),t.adapter.idAttribute||(Ti.API.info('No config.adapter.idAttribute specified for table "'+t.adapter.collection_name+'"'),Ti.API.info('Adding "'+ALLOY_ID_DEFAULT+'" to uniquely identify rows'),t.columns[ALLOY_ID_DEFAULT]="TEXT UNIQUE",t.adapter.idAttribute=ALLOY_ID_DEFAULT),cache.config[e]=t,t},module.exports.afterModelCreate=function(t,e){return cache.Model[e]?cache.Model[e]:(t=t||{},t.prototype.idAttribute=t.prototype.config.adapter.idAttribute,Migrate(t),cache.Model[e]=t,t)},module.exports.sync=Sync;