import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsPageComponent } from './components/results-page/results-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { RESULTS_PAGE_PATH, SEARCH_PAGE_PATH } from './utils/activity.const';

const routes: Routes = [
    {
        path: SEARCH_PAGE_PATH,
        component: SearchPageComponent,
    },
    {
        path: RESULTS_PAGE_PATH,
        component: ResultsPageComponent,
    },
    { path: '', redirectTo: '/search-activity', pathMatch: 'full' },
    { path: '**', component: SearchPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
