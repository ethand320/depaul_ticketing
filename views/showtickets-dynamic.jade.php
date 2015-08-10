extends layout

block content
	h1= title
  
	h2 All Current Tickets
	
	ul
		each ticker, i in ticketsList
			li
				a(href="/dispticket?hostname=#{ticker.hostname}")= ticker.hostname
				
