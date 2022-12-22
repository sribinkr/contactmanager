import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from 'src/models/myContact';
import { MyGroup } from 'src/models/myGroup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {

  contactId:string=''
  contact:MyContact = {} as MyContact
  groups:MyGroup[] = [] as MyGroup[]


  constructor(private activateRoute:ActivatedRoute,private api:ApiService,private router:Router) { }

  ngOnInit(): void {
   this.activateRoute.params.subscribe((data)=>{
    console.log(data['contactId']);
    this.contactId = data['contactId']
    
   }) 

   //call api for get a partiular contact
   this.api.viewContact(this.contactId).subscribe(
    (data:any)=>{
      this.contact = data
      console.log(this.contact);
      

    }
   )
   this.api.getAllGroups().subscribe(
    (data:any)=>{
     this.groups = data
     console.log(this.groups);
      
    }
   )



  }

  //updte contact
  updateContact(){
    //api call for updating the existing contact,arg:  contact
    this.api.updateContact(this.contactId,this.contact).subscribe(
      (data:any)=>{
        this.router.navigateByUrl('')

      }
    )
  }

}
