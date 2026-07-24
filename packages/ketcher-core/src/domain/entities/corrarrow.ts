export class CorrArrow {
  readonly id: string;
  readonly begin: number;
  readonly end: number;
  readonly color: string;
  readonly dash: boolean;
  readonly arrowType: string;
  readonly hintText: string;

  constructor(params) {
    this.id = params.id;
    this.begin = params.begin;
    this.end = params.end;
    this.color = params.color;
    this.dash = params.dash;
    this.hintText = params.hintText;
    this.arrowType = params.arrowType;
  }
}

export default CorrArrow;
