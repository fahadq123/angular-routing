import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
allowEdit = false;
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    // Alternatively

    // console.log(this.route.queryParams.subscribe((params: Params) => {
    //   console.log(params['allowEdit']);
    //   console.log(params['testsQuery']);
    // }));

    // console.log(this.route.fragment.subscribe((fragment) => {
    //   console.log(fragment);
    // }));
    this.route.queryParams.subscribe((queryParams: Params)=> {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
      this.serverStatus = this.server.status;
      this.serverName = this.server.name;
    });
    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);

  }


  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.server.name, status: this.server.status});
    console.log(this.router);
    this.router.navigate(['servers', this.server.id]);
  }

}
