// Google Apps Script - wedding-invitation RSVP handler
// Deploy eka "Web App" widihata karanna - Execute as: Me, Who has access: Anyone

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Handle saving generated links
    if (data.action === "generate") {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var linkSheet = ss.getSheetByName("Generated_Links");
      if (!linkSheet) {
        linkSheet = ss.insertSheet("Generated_Links");
        linkSheet.appendRow(["Name", "Phone", "Max Guests", "Generated Link", "Timestamp"]);
      }
      linkSheet.appendRow([
        data.name || "",
        data.phone || "",
        data.guests || "",
        data.link || "",
        new Date().toISOString()
      ]);
      return ContentService
        .createTextOutput(JSON.stringify({ status: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    
    // Headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Name", "Phone", "Attending", "Guests", "Message", "Timestamp"]);
    }
    
    var name = (data.name || "").toString().trim().toLowerCase();
    var phone = (data.phone || "").toString().trim();

    // Check for duplicates
    if (name || phone) {
      var rows = sheet.getDataRange().getValues();
      for (var i = 1; i < rows.length; i++) {
        var existingName = (rows[i][0] || "").toString().trim().toLowerCase();
        var existingPhone = (rows[i][1] || "").toString().trim();
        
        if (name && existingName === name) {
          return ContentService
            .createTextOutput(JSON.stringify({ status: "error", message: "Duplicate RSVP: This name has already been registered." }))
            .setMimeType(ContentService.MimeType.JSON);
        }
        
        if (phone && existingPhone === phone) {
          return ContentService
            .createTextOutput(JSON.stringify({ status: "error", message: "Duplicate RSVP: This phone number has already been registered." }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    sheet.appendRow([
      data.name || "",
      data.phone || "",
      data.attending || "",
      data.guests || "",
      data.message || "",
      new Date().toISOString()
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET request - Admin panel walata RSVPs ganna
function doGet(e) {
  try {
    if (e.parameter.action === "get") {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
      var rows = sheet.getDataRange().getValues();
      
      // Skip header row
      var entries = [];
      for (var i = 1; i < rows.length; i++) {
        entries.push({
          name: rows[i][0] || "",
          phone: rows[i][1] || "",
          attending: rows[i][2] || "",
          guests: rows[i][3] || "",
          message: rows[i][4] || "",
          timestamp: rows[i][5] || ""
        });
      }
      
      return ContentService
        .createTextOutput(JSON.stringify({ status: "success", data: entries }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (e.parameter.action === "get_links") {
      var linkSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Generated_Links");
      if (!linkSheet) {
        return ContentService
          .createTextOutput(JSON.stringify({ status: "success", data: [] }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      var linkRows = linkSheet.getDataRange().getValues();
      var links = [];
      for (var j = 1; j < linkRows.length; j++) {
        links.push({
          name: linkRows[j][0] || "",
          phone: linkRows[j][1] || "",
          guests: linkRows[j][2] || "",
          link: linkRows[j][3] || "",
          timestamp: linkRows[j][4] || ""
        });
      }
      
      return ContentService
        .createTextOutput(JSON.stringify({ status: "success", data: links }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok", message: "RSVP API running" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
