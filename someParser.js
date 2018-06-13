var USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';
var https = require('https');
var querystring = require('querystring');
var iconv = require('iconv-lite');

function httpsRequest(params, postData) {
    return new Promise(function (resolve, reject) {
        var req = https.request(params, function (res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function () {
                try {
                    body = Buffer.concat(body);
                } catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function (err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
}


async function sendRequest(){
    var pd = {
        'asktext' : 1,
        'asktype' : 1
    }
    var post_data = querystring.stringify(pd);

    var post_options = {
        host: '????',
        scheme: 'http',
        port: '443',
        path: '???',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data),
            'Cookie': '???',
            'referer':'http://magicmight.ru/mentor/?access_token=bf5eba225bc6b4728a3dfade8ee1af93',
            'user-agent': USER_AGENT,
            'x-requested-with':'XMLHttpRequest'
        }
    };
    let result = await httpsRequest(post_options,post_data);
    let res = iconv.decode(result, 'UTF-8');
    console.log(res);
}
sendRequest()