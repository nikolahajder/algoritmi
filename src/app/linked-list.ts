import { Node } from "./node";

export class LinkedList {
    head: any;
    size: number;

    constructor() {
        this.head = 0;
        this.size = 0;
    }

    add(element) {
        var node = new Node(element);
        // to store current node
        var current;

        // if list is Empty add the
        // element and make it head
        if (this.head == 0)
            this.head = node;
        else {
            current = this.head;

            // iterate to the end of the
            // list
            while (current.next) {
                current = current.next;
            }

            // add node
            current.next = node;
        }
        this.size++;
    }

    link() {
        var current;
        current = this.head;
        while (current.next) {
            current = current.next;
        }

        current.next = this.head;
    }

    murderPeople(){
        var current, temp;
        current = this.head;
        temp = current.next;

        while(this.size > 1) {
            current.next = temp.next;
            current = current.next;
            temp = current.next;
            this.size--;
        }

        return current.element;
    }
}