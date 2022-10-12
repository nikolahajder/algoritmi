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
        
        var current;

        if (this.head == 0)
            this.head = node;
        else {
            current = this.head;

            while (current.next) {
                current = current.next;
            }

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