/**
 * Callback for rendering the homepage card.
 * @return {CardService.Card} The card to show to the user.
 */
function onHomepage(e) {
  return createGenericCard();
}

/**
 * Creates a generic card with a message.
 * @return {CardService.Card} The assembled card.
 */
function createGenericCard() {
  var header = CardService.newCardHeader()
      .setTitle('Participants');

  var textParagraph = CardService.newTextParagraph()
      .setText('Please open an email to view participants / potential wrike tasks.');

  var section = CardService.newCardSection()
      .addWidget(textParagraph);

  var card = CardService.newCardBuilder()
      .setHeader(header)
      .addSection(section)
      .build();

  return card;
}
