function WordList(source, delimeter) {
    this.delimeter = delimeter || " ";
    this.words = source.split(this.delimeter);;
    this.size = function(){
        return this.words.length;
    }
    this.get= function (i) {
        return new Word(this.words[i]);
    }
    this.sort = function(){
        this.words.sort()
    }

}

function Word(src, language) {
    this.src = src;
    this.voice = window.speechSynthesis.getVoices()[1];
    this.language = language || "en" ;
    this.translation = (this.language == 'en') ? new Word('word','fr') : null;
    this.say = function() {
        var msg = new SpeechSynthesisUtterance(this.src);
        msg.voice = this.voice;
        window.speechSynthesis.speak(msg);
    }
    this.spelledRight = function(word) {
        return word.toUpperCase() == src.toUpperCase();
    }

}

function createList() {
	$('#spellingList').html('');
    wordList = new WordList($("#wordList").val());
    for(var i = 0; i < wordList.size(); i++) {
        $("#spellingList").append(`<div><button onclick="wordList.get(${i}).say()">Say My Word</button><input type="text" id="${i}"></div>`)
    }
    $("#wordList").val("");
}

function gradeMe() {
    student = [];
    for(var i = 0; i < wordList.size(); i++) {
        student.push($("#" + i).val());
        if (student[i] == wordList.get(i).src) {
            $("#" + i).addClass("success").removeClass("failure")
        } else {
            $("#" + i).addClass("failure").removeClass("success")
        }
    }
}
