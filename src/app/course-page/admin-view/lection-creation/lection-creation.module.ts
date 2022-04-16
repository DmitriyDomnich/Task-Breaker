import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectionCreationComponent } from './lection-creation.component';
import { LectionCreationItemsComponent } from './create-with-links/lection-creation-items.component';
import { EditorComponent } from './editor-creation-way/editor/editor.component';
import { QuillModule } from 'ngx-quill';
import { StoreModule } from '@ngrx/store';
import {
  creationItemsFeatureKey,
  creationItemsReducer,
} from './store/lection-creation.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { PagePreviewModule } from '../../widgets/page-preview/page-preview.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { CreationToolsModule } from '../../widgets/creation-tools/creation-tools.module';
import { MatInputModule } from '@angular/material/input';
import { EditorCreationWayComponent } from './editor-creation-way/editor-creation-way.component';
import { EffectsModule } from '@ngrx/effects';
import { LectionCreationEffects } from './store/lection-creation.effects';

@NgModule({
  declarations: [
    LectionCreationComponent,
    LectionCreationItemsComponent,
    EditorComponent,
    EditorCreationWayComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuillModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    EffectsModule.forFeature([LectionCreationEffects]),
    StoreModule.forFeature(creationItemsFeatureKey, creationItemsReducer),
    PagePreviewModule,
    CreationToolsModule,
  ],
})
export class LectionCreationModule {}
