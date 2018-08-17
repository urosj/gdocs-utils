//Drive activity in last 24 hours
function driveChangesIn24h() {
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();  
  var today     = new Date();
  var yesterday = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);  
  
  var search = '(trashed = true or trashed = false) and (modifiedDate > "' + yesterday.toISOString() + '")';
  var modifiedFiles  = DriveApp.searchFiles(search);
  
  var timezone = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
  while( modifiedFiles.hasNext() ) {
    var file = modifiedFiles.next();
    var dateCreated =  Utilities.formatDate(file.getDateCreated(), timezone, "yyyy-MM-dd HH:mm")
        
    sheet.appendRow([dateCreated, file.getName(), file.getUrl()]);
    
  }
}

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Updates from the last 24 hours', functionName: 'driveChangesIn24h'}
  ];
  spreadsheet.addMenu('Actions', menuItems);
}
