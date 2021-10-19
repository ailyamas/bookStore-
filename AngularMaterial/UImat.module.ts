import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatTableModule} from '@angular/material/table';

const MaterialComponents= [
   MatSliderModule,
   MatFormFieldModule,
   MatTableModule
]
@NgModule({
declarations: [],
imports: [MaterialComponents],
exports:[MaterialComponents],
})
export class UImatModule {

}