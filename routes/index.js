var express = require('express');
var router = express.Router();
formArray = {"ipAddress": {"Label": "IP Address", "Name": "ipAddress", "Type": "text", "Value" : 'null'},
			    "addNagios" : {"Label": "Add to Nagios", "Name": "addNagios", "Type": "checkbox", "Value" : 'null'},
				"addNetworker": {"Label": "Add to Networker", "Name": "addNetworker", "Type": "checkbox", "Value" : 'null'},
				"addRecordsIpplan": {"Label": "Add to IpPlan", "Name": "addRecordsIpplan", "Type": "checkbox", "Value" : 'null'},
				"configureIptables": {"Label": "Configure Local FW", "Name": "configureIptables", "Type": "checkbox", "Value" : 'null'},
				"configureNics": {"Label": "Setup NICs", "Name": "configureNics", "Type": "checkbox", "Value" : 'null'},
				"dnsRequest": {"Label": "Put in DNS request", "Name": "dnsRequest", "Type": "checkbox", "Value" : 'null'},
				"enableJumboFrames": {"Label": "Enable Jumbo Frames on backup nic", "Name": "enableJumboFrames", "Type": "checkbox", "Value" : 'null'},
				"fwTickets": {"Label": "Put in FW tickets", "Name": "fwTickets", "Type": "checkbox", "Value" : 'null'},
				"hostname": {"Label": "Hostname", "Name": "hostname", "Type": "text", "Value" : 'null'},
				"registerSatellite": {"Label": "Register to Satellite", "Name": "registerSatellite", "Type": "checkbox", "Value" : 'null'},
				"addToSpreadhseet": {"Label": "Add to inventory spreadhseet", "Name": "addToSpreadhseet", "Type": "checkbox", "Value" : 'null'},
				
				"networkerHostFiles": {"Label": "Add to networker", "Name": "networkerHostFiles", "Type": "checkbox", "Value" : 'null'},
				
				"likewiseSetup": {"Label": "Setup A/D auth with likewise", "Name": "likewiseSetup", "Type": "checkbox", "Value" : 'null'},
				"setupAccess": {"Label": "Configure login/sudo access", "Name": "setupAccess", "Type": "checkbox", "Value" : 'null'},
				"verifyDomainAuth": {"Label": "Verify Authentication is working", "Name": "verifyDomainAuth", "Type": "checkbox", "Value" : 'null'},
				"vmwareOu": {"Label": "Place in proper vmware OU", "Name": "vmwareOu", "Type": "checkbox", "Value" : 'null'}
				};



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
	
	
	
	
	
	router.get('/dispticket-linux-dynamic', function(req, res){

	//var formArray = {"first": {"Label": "labelval", "Name": "nameval", "Checked" : "vmwareOu" } };
	
	var db = req.db;
	
	
	var collection = db.get('linuxticketcollection-dynamic');
	
	
	

		collection.find({"hostname.Value" : req.query['hostname']}, function(e, docs) {
	
		//var formArray = {"ipAddress": {"Label": "IPLabel", "Name": "ipaddress", "value" : 'unchanged'} };
		
		// Loop through each item in the template array and add the 'value' of what is set in the database
		// Values are stored in the linuxticket collection in mongo, template array (formArray) is a global var for now
		//for (field in formArray) {
			//formArray[field].value = 'changed!';
			//formArray[field].Value = docs[0][field];
			
			//}
		res.render("dispticket-linux-dynamic", {"ticketInfo" : docs[0] });
	
		}); 
	
	
	
	});

router.post('/dispticket-linux-dynamic', function(req, res){

	//var hostname = req.body.hostname;
	var db = req.db;
	var collection = db.get('linuxticketcollection-dynamic');
	
	
	// need to build loops here I think :(
	// ah!  loop through the req.body array and set each corresponding val to the formArray - would totally eliminate need for this collection
	
	/*for ( request in req.body)
		{
			//console.log(req.body);
			//console.log(request);
			//try {
			//formArray[request].Value = req.body[request];
			
			//} catch (ex) { console.log("missing request val is " + request);  }
			
			//if ( formArray[request] ) formArray[request].Value = req.body[request];
			
		 
			
			
		
					if ( formArray[request] ) formArray[request].Value = req.body.request;
					
					
			//var vm = 'vmwareOu';
			//if (req.body[vm]) console.log("vmware oU is found in req.body");
			
			
		} */
		
		for ( item in formArray)
			{
				console.log(req.body[item]);
				
				
				if( req.body[item])
				{
					console.log("conditionally found req.body item");
					formArray[item].Value = req.body[item];
				}
				
				else
					{
			
					 // If the item in form array is NOT being submitted, then it must be set to null
						formArray[item].Value = '';
						console.log('Item not posted: ' + item);
					}	
					
			}
			
			
		formArray.hostname.Value = 'pinnwebtst01';
			
//	console.log(formArray.configureNics.Value);
	//console.log("from form " + req.body.hostname);
	
	
	collection.update({"hostname.Value" : 'pinnwebtst01'}, formArray
	//collection.insert(formArray
	
	
	/*{
		$set: formArray
		{
		ip_add_var: req.body.ipaddress,
		fwTickets: req.body.fwTickets,
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
	}*/ , function(err, doc) {
	
		//var str = '/dispticket-linux-dynamic?hostname='+ req.body.hostname;
		var str = '/dispticket-linux-dynamic?hostname='+ formArray.hostname.Value;
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
			
			
			
			
			
			
			
			
			
			