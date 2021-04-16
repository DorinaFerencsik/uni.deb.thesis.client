import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';
import { of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { FileOwner } from 'src/app/shared/enums/file-owner.enum';

import { ApiDiagramService } from '../../services/api-diagram.service';
import { ApiFileService } from '../../services/api-file.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent {

  public diagram: any;
  public data: any;
  public source: string;
  private diagramId: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiDiagramService,
    private apiFileService: ApiFileService,
    private sanitizer: DomSanitizer
  ) {
    this.diagramId = this.route.snapshot.params.id;
    this.apiService.getUserDiagramById(this.diagramId)
    .pipe(
      first(),
      switchMap((diagram) => {
        this.diagram = diagram;
        this.source =  Base64.atob(diagram.sourceCode);
        return this.diagram.data
          ? this.apiFileService.readData(
            this.diagram.data.source ? FileOwner.Example : FileOwner.User,
            this.diagram.data.name,
            this.diagram.data.source)
          : of(null);
      })
    ).subscribe((fileContent) => {
      if (fileContent) {
        this.data = {
          data: fileContent.content,
          columns: Object.keys(fileContent.content[0]),
        };
      }
    });
  }

}
