var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


router.get('/dispticket', function(req, res){

	var db = req.db;
	var collection = db.get('windowsticketcollection');
	collection.find({hostname: req.query['hostname']}, function(e, docs) {
	
	
	res.render("dispticket", {"ticketInfo" : docs[0] });
	
		});
	
	});
	
	
	router.get('/dispticket-linux', function(req, res){

	var db = req.db;
	var collection = db.get('linuxticketcollection');
	collection.find({hostname: req.query['hostname']}, function(e, docs) {
	
	
	res.render("dispticket-linux", {"ticketInfo" : docs[0] });
	
	});
	
	});
	
	

router.post('/dispticket-linux', function(req, res){

	//var hostname = req.body.hostname;
	var db = req.db;
	var collection = db.get('linuxticketcollection');
	
	collection.update({hostname: req.body.hostname},
	
	{
		$set:
		{
		ipAddress: req.body.ipaddress,
		fwTickets: req.boy.fwTickets,
		vmwareOu: req.body.vmwareOU,
		configureNics: req.body.configureNics,
		addRecordsIpplan: req.body.addRecordsIpplan,
		enableJumboFrames: req.body.enableJumboFrames,
		installSpacewalk: req.body.installSpacewalk,
		registerSpacewalk: req.body.registerSpacewalk,
		runSambaScript: req.body.runSambaScript,
		verifyDomainAuth: req.body.verifyDomainAuth,
		dnsRequest: req.body.dnsRequest,
		addNagios: req.body.addNagios,
		addNetworker: req.body.addNetworker,
		networkerHostFiles: req.body.networkerHostFiles,
		configureIptables: req.body.configureIptables,
		setupAccess: req.body.setupAccess
		}
	}, function(err, doc) {
	
		var str = '/dispticket-linux?hostname='+ req.body.hostname;
		res.location(str);
		res.redirect(str);
	
		});
});
			
	
router.post('/dispticket', function(req, res){

	var hostname = req.body.hostname;

	var db = req.db;
	var collection = db.get('windowsticketcollection');
	collection.update({hostname: req.body.hostname},
	{ $set: 
		{
			vmwareOu: req.body.vmwareOU, 
	
			addRecordsIpplan: req.body.addRecordsIpplan,
			configureNics: req.body.configureNics,
			joinDomain: req.body.joinDomain,
			moveAdOU: req.body.moveAdOU,
			dnsRequest: req.body.dnsRequest,
			addNagios: req.body.addNagios,
			addNetworker: req.body.addNetworker,
			networkerHostFiles: req.body.networkerHostFiles,
			verifyBackupDirs: req.body.verifyBackupDirs,
			updateMcAfee: req.body.updateMcAfee,
			applyWsusRegEdit: req.body.applyWsusRegEdit,
			winUpdate: req.body.winUpdate,
			verifyWsus: req.body.verifyWsus,
			checkSccmStatus: req.body.checkSccmStatus,
			createWikiDoc: req.body.createWikiDoc,
			firewallVpnTickets: req.body.firewallVpnTickets
			
			
			
		}    }, function(err, doc){
			
	
	var str = '/dispticket?hostname=' + req.body.hostname;
	res.location(str)
	res.redirect(str);
	
	});
	
});
	
	
	
	
	
router.get('/showtickets', function(req, res){
		
		
		var db = req.db;
		var collection = db.get('windowsticketcollection');
		
		var outsideTickets = "global";
	//	console.log("testing debuggage");
		
		collection.find({}, function(e, wintickets) {
	//res.render("showtickets", {"ticketlist" : tickets});
				
				newCollection = db.get('linuxticketcollection');
				
				newCollection.find({}, function(e, linuxtickets) {
					res.render("showtickets",{"winticketlist": wintickets, "linticketlist": linuxtickets} );
					
					}); 
				
				
			});
			//console.log("outsideTickets is " + outsideTickets);
			//console.log("tickets is = " + tickets);
			//res.render("showtickets", {"ticketlist" : outsideTickets});
			

	})

	

router.get('/newticket-windows', function(req, res){

	res.render('newticket-windows', { title: 'Create New Ticket'});
	
	});
	
router.post('/newticket-windows', function(req, res) {


	var db = req.db;
	var hostname = req.body.hostname;
	var ipAddress = req.body.ipaddress;
	
	var collection = db.get('windowsticketcollection');
	
	collection.insert({
	"hostname" : hostname,
	"ipAddress" : ipAddress,
	"vmwareOu" : false,
	"addRecordsIpplan" : false,
	"configureNics" : false,
	"joinDomain" : false,
	"moveAdOU" : false,
	"dnsRequest" : false,
	"addNagios" : false,
	"addNetworker" : false,
	"networkerHostFiles" : false,
	"verifyBackupDirs" : false,
	"updateMcAfee" : false,
	"applyWsusRegEdit" : false,
	"winUpdate" : false,
	"verifyWsus" : false,
	"checkSccmStatus" : false,
	"createWikiDoc" : false,
	"firewallVpnTickets" : false }, function(err, doc) {
	
	
	if(err) { res.send("insert error!");}
	
	else {
			res.location("showtickets");
			res.redirect("showtickets");
			}
			
			
	});
});
			
			
router.get('/newticket-linux', function(req, res) {

		res.render('newticket-linux', {title: 'Create New Linux Ticket'});
		
		});
			
router.post('/newticket-linux', function(req, res){



		var db = req.db;
		var hostname = req.body.hostname;
		var ipAddress = req.body.ipaddress;
		
		var collection = db.get('linuxticketcollection');
		
		collection.insert( {
		"hostname" : hostname,
		"ipAddress" : ipAddress,
		"fwTickets" : false,
		"vmwareOu" : false,
		"addRecordsIpplan" : false,
		"configureNics" : false,
		"enableJumboFrames": false,
		"installSpacewalk": false,
		"registerSpacewalk": false,
		"runSambaScript": false,
		"verifyDomainAuth": false,
		"dnsRequest": false,
		"addNagios": false,
		"addNetworker": false,
		"networkerHostFiles": false,
		"configureIptables": false,
		"setupAccess" : false
		}, function(err, doc) {
		
				if(err) {res.send("insertion error");}
		
				else {
					var str = 'dispticket-linux?hostname=' + hostname;
				
					res.location(str);
					res.redirect(str);
			
				}
			
			}
		);
});		
			
			
			
			
			
			
			
			
			
			