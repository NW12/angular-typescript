import { Component, OnInit } from '@angular/core';
import { WhyServicesService } from '../../../shared/admin/whyservices.service';
// import{ServicesService} from '../../../shared/admin'
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'

import { IServices, IWhyServices } from '../../../shared/interfaces';
import '../../../shared/ckeditor/ckeditor.loader';
import 'ckeditor';
declare var $: any;

@Component({
  selector: 'ngx-add-detail',
  templateUrl: './add-detail.component.html',
  styleUrls: ['./add-detail.component.scss']
})
export class AddDetailComponent implements OnInit {
  imageUrl = '';
  someData: any;
  serviceresponse: IServices[];
  showLoader = false;
  constructor(public WhyService: WhyServicesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getValue();
  }

  getValue() {
    this.WhyService.getSearchServices().subscribe((res: IServices[]) => {
      if (res) {
        this.serviceresponse = res;
        console.log(this.serviceresponse, 'this.serviceresponse');
      }
    })
  }

  customDropDown(e){
    e.preventDefault();
    let ID = e.currentTarget.id;
    console.log(ID);

  }

  onFileChanged($event) {
    var file = $event.target.files[0];
    this.imageUrl = file;
  }

  onImageFileSelected() {
    this.showLoader = true;
    let formData: FormData = new FormData();
    formData.append('title', this.WhyService.selectedWhyService.title);
    formData.append('subtitle', this.WhyService.selectedWhyService.subtitle);
    formData.append('description', this.WhyService.selectedWhyService.description);
    formData.append('serviceId', this.WhyService.selectedWhyService.serviceId);
    formData.append('image', this.imageUrl);
    this.WhyService.uploadProductPic(formData).subscribe(res => {
      this.showLoader = true;
      this.router.navigateByUrl('/admin/add-detail');
      swal({
        title: "WhyService has been added successfully.",
        type: "success",
        confirmButtonClass: "btn-success",
        confirmButtonText: "OK!",
        focusConfirm: false
      })
    },
      error => {
        console.log(error);
      });
  }

  resetForm() {
    this.WhyService.selectedWhyService = {
      _id: '',
      title: '',
      subtitle: '',
      description: '',
      serviceId: '',
      image: '',
    };
  }

}
