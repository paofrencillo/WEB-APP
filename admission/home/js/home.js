
class Node {
    constructor(announcement) {
        this.announcement = announcement;
        this.next = null;
        this.prev = null;
    }
}

class Announcements {
    constructor() {
        this.head = null;
        this.tail = null;
        this.current_announcement = null;
    }

    add(announcement) {
        // Add all announcement to the link list
        // Add new annoucement
        const NEW_NODE = new Node(announcement);
        // Check if head is empty
        if (this.head == null) {
        // If head is empty, add the first announcement there
            this.head = NEW_NODE;
            this.tail = NEW_NODE;
        }
        // If head is occupied iterate through nodes then add the 
        // announcement when the current == null
        else {
            NEW_NODE.next = this.head;
            this.head.prev = NEW_NODE;
            this.tail = this.head;
            this.head = NEW_NODE;
        }
        // Make the newly added announcement the current announcement to be displayed
        this.current_announcement = NEW_NODE;
        document.getElementById("announcements").innerHTML = this.current_announcement.announcement;
    }

    prevAnnouncement() {
        var current_node = this.current_announcement;

        if ( this.head == null ) {
            document.getElementById("announcements").innerHTML = "No Announcements";
        }
        else {
            console.log(current_node.prev);
            document.getElementById("announcements").innerHTML = current_node.announcement;
            this.current_announcement = current_node.prev;
        }
    }

    nextAnnouncement() {
        var current_node = this.current_announcement;

        if (this.head == null) {
            document.getElementById("announcements").innerHTML = "No Announcements";
        }
        else {
            console.log(current_node.next);
            document.getElementById("announcements").innerHTML = current_node.announcement;
            this.current_announcement = current_node.next;
        }

    }

    display() {
        var current = this.head;
        while ( current.next != null ) {
            current = current.next;
            console.log(current.announcement);
        }
    }
}


var a = new Announcements();
var all_announcements = ["Never gonna give you up", "Never gonna let you down", "Never gonna run around and desert you",
                        "Never gonna make you cry", "Never gonna say goodbye", "Never gonna tell a lie and hurt you"];

for ( var announcement of all_announcements ) {
    a.add(announcement);
    console.log(announcement);
}