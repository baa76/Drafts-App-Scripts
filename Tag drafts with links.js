let findRegex = /http(s)?.*/; // you could use more advanced regex
if (findRegex.test(draft.content)) {
   draft.addTag("URL");
   draft.update();
}