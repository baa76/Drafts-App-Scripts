let findRegex = /[http|https]:/; // you could use more advanced regex
if (findRegex.test(draft.content)) {
   draft.addTag("links");
   draft.update();
}