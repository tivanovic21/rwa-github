const jwt = require("jsonwebtoken");

exports.kreirajToken = function(korisnik, tajniKljucJWT, jwtValjanost){
	let token = jwt.sign({korime: `${korisnik.korime}`}, tajniKljucJWT, {expiresIn: jwtValjanost});
	console.log("korisnik token: ", korisnik, "tajniKljuc: ", tajniKljucJWT, "jwtvaljanost: ", jwtValjanost);
	console.log(token);
    return token;
}

exports.provjeriToken = function(zahtjev, tajniKljucJWT) {
	//console.log("zahtjev: ", zahtjev);
    if (zahtjev.session.authorization != null) {
        console.log(zahtjev.session.authorization);
        let token = zahtjev.session.authorization;
        try {
            let podaci = jwt.verify(token, tajniKljucJWT);
            console.log("JWT podaci: ", podaci);
			return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    } else return false;
}

exports.ispisiDijelove = function(token){
	let dijelovi = token.split(".");
	let zaglavlje =  dekodirajBase64(dijelovi[0]);
	console.log(zaglavlje);
	let tijelo =  dekodirajBase64(dijelovi[1]);
	console.log(tijelo);
	let potpis =  dekodirajBase64(dijelovi[2]);
	console.log(potpis);
}

exports.dajTijelo = function(token){
	let dijelovi = token.split(".");
	return JSON.parse(dekodirajBase64(dijelovi[1]));
}

function dekodirajBase64(data){
	let buff = new Buffer(data, 'base64');
	return buff.toString('ascii');
}
