import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/data.type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  SearchResult: undefined | product[];
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    // console.warn(query);
    query &&
      this.product.searchproduct(query).subscribe((res) => {
        this.SearchResult = res;
      });
    // if (query) {
    //   this.SearchResult = "data not found";
    // }
  }
}
