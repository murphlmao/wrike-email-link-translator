/**
 * Callback for rendering the card for a specific Gmail message.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onGmailMessage(e) {
    console.log(e);
    // Get the ID of the message the user has open.
    var messageId = e.gmail.messageId;
  
    // Get an access token scoped to the current message and use it for GmailApp
    // calls.
    var accessToken = e.gmail.accessToken;
    GmailApp.setCurrentMessageAccessToken(accessToken);
  
    // Get the thread of the message.
    var message = GmailApp.getMessageById(messageId);
    var thread = message.getThread();
    var messages = thread.getMessages();
  
    // Extract all email addresses from the thread.
    var emailAddresses = new Set();
    messages.forEach(function(msg) {
      var fromEmail = extractEmail(msg.getFrom());
      if (fromEmail) {
        emailAddresses.add(fromEmail);
      }
      msg.getTo().split(',').forEach(function(email) {
        var toEmail = extractEmail(email.trim());
        if (toEmail) {
          emailAddresses.add(toEmail);
        }
      });
      msg.getCc().split(',').forEach(function(email) {
        var ccEmail = extractEmail(email.trim());
        if (ccEmail) {
          emailAddresses.add(ccEmail);
        }
      });
    });
  
    // Convert the Set to an Array and join with line breaks for display.
    var recipientList = Array.from(emailAddresses).map(email => `• ${email}`).join('<br>');
  
    return createRecipientCard(Array.from(emailAddresses), recipientList);
  }
  
  /**
   * Extracts the email address from a string.
   * @param {String} emailString The string containing the email address.
   * @return {String} The extracted email address.
   */
  function extractEmail(emailString) {
    var emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    var match = emailString.match(emailPattern);
    return match ? match[0] : null;
  }
  
  /**
   * Creates a card with a list of email recipients.
   * @param {Array} emailArray The array of email recipients.
   * @param {String} recipients The list of email recipients.
   * @return {CardService.Card} The assembled card.
   */
  function createRecipientCard(emailArray, recipients) {
    var header = CardService.newCardHeader()
        .setTitle('Participants');
  
    var textParagraph = CardService.newTextParagraph()
        .setText(recipients);
  
    var section = CardService.newCardSection()
        .addWidget(textParagraph);
  
    var blankSection = CardService.newCardSection()
        .addWidget(CardService.newTextParagraph().setText(' ')); // New blank section for the HR line ending
  
    var wrikeSection = checkWrikeTasks(emailArray);
  
    var footer = CardService.newFixedFooter()
        .setPrimaryButton(CardService.newTextButton()
            .setText('Developed by Murph')
            .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
            
            .setOpenLink(CardService.newOpenLink()
                .setUrl('https://murph.rip')))
        .setSecondaryButton(CardService.newTextButton()
            .setText('GitHub')
            .setTextButtonStyle(CardService.TextButtonStyle.FILLED)  // Set button style to SQUARE
            .setOpenLink(CardService.newOpenLink()
                .setUrl('https://github.com/murphlmao/wrike-email-link-translator')));
  
    var card = CardService.newCardBuilder()
        .setHeader(header)
        .addSection(wrikeSection)
        .addSection(section)
        .addSection(blankSection)
        .setFixedFooter(footer)
        .build();
  
    return card;
  }
  
  /**
   * Checks if any email addresses start with 'wrike' and creates a section listing their corresponding URLs.
   * @param {Array} emailArray The array of email recipients.
   * @return {CardService.CardSection} The section indicating if wrike tasks are found.
   */
  function checkWrikeTasks(emailArray) {
    var wrikeTasks = [];
  
    emailArray.forEach(function(email) {
      if (email.startsWith('wrike+')) {
        var wrikeId = email.split('+')[1].split('@')[0];
        var wrikeUrl = 'https://www.wrike.com/open.htm?id=' + wrikeId;
        wrikeTasks.push({ email: email, url: wrikeUrl });
      }
    });
  
    var text = '';
    if (wrikeTasks.length > 0) {
      text = "Wrike tasks found:<br style='line-height:100;'>";
      wrikeTasks.forEach(function(task) {
        text += "\u2022 " + task.email + "<br>&nbsp;&nbsp;&nbsp;&nbsp;\u25E6 <a href='" + task.url + "'>Link to task</a><br><br>";
      });
      // Remove the trailing <br><br> at the end
      text = text.slice(0, -8);
    } else {
      text = "No Wrike tasks found in email thread.";
    }
  
    var textParagraph = CardService.newTextParagraph()
        .setText(text);
  
    var section = CardService.newCardSection()
        .addWidget(textParagraph);
  
    return section;
  }
  