//  -----------------------------------------------------------------------------
//  Let's 機械学習で遊ぼう！Google Cloud PlatformのAPIサービスやTensorFlowを使ったサンプルレシピ集
//  --Google Cloud Vision API 光学文字認識(OCR)サンプル-- 
//  -----------------------------------------------------------------------------

// このAPI_KEYにAPIキーを設定してください
// 例えば、APIキーが「abcdefg12345」の場合次のように指定します

var API_KEY = 'abcdefg12345';
var GOOGLE_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY;

// ファイルアップロード 
$(function () {
  $('#fileform').on('submit', uploadFiles);
});

function uploadFiles (event) {
  event.preventDefault(); // Prevent the default form post

  var file = $('#fileform [name=imagefile]')[0].files[0];
  var reader = new FileReader();

  reader.onloadend = sendFileToCloudVision;
  reader.readAsDataURL(file);
}


// VisionAPIの呼び出し 
function sendFileToCloudVision (event) {
  var content = event.target.result;
  
  // リクエストの作成
  var request = {
    requests: [{
      image: {
        content: content.replace('data:image/jpeg;base64,', '')
      },
      features: [{
        type: 'TEXT_DETECTION',
        maxResults: 200
      }],
      imageContext:{
        languageHints:["ja","en","zh","ko"]
      }
    }]
  };


  // POST処理
  $.post({
    url: GOOGLE_URL,
    data: JSON.stringify(request),
    contentType: 'application/json'
  }).fail(function (jqXHR, textStatus, errormsg) {
    $('#results').text('error: ' + textStatus + ' ' + errormsg);
  }).done(displayJSON);
}

// レスポンス表示
function displayJSON (data) {
  var contents = JSON.stringify(data, null, 4);
  $('#results').text(contents);
  var evt = new Event('results-displayed');
  evt.results = contents;
  document.dispatchEvent(evt);
}
