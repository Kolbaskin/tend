{{include 'TenderInfo.tpl'}}
<div class="tndr_form bid_form">
    <p><span data-bind="text: finTimePhrase"></span> <span data-bind="text: finTime"></span></p>
<form method="post"  method="post" data-bind="submit: submit" enctype='multipart/form-data'>
    <ul class="inlined">
        <tpl if="!date_workstart">
        	<li class="form_text">Дата начала работ</li><li class="form240"><div class="input_wrap"><input type="text" name="date_start" data-bind="value: v.date_start"></div></li>
    		<li class="form_alert" style="display: none;">Обязательное поле!</li><br>
        </tpl>    
        <tpl if="!date_workfin">
    		<li class="form_text">Дата окончания работ</li><li class="form240"><div class="input_wrap"><input type="text" name="date_fin" data-bind="value: v.date_fin"></div></li>
    		<li class="form_alert" style="display: none;">Обязательное поле!</li><br>
        </tpl>
        <tpl if="!positions">
    		<li class="form_text two_lines">Предлагаемая цена <br>за единицу</li><li class="form240"><div class="input_wrap"><input type="text" name="price_pos" data-bind="value: v.price_pos"></div></li>
    		<li class="form_alert" style="display: none;">Обязательное поле!</li><br>
    
    		<li class="form_text two_lines">Предлагаемая <br>полная цена</li><li class="form240"><div class="input_wrap"><input type="text" name="price_full" data-bind="value: v.price_full"></div></li>
    		<li class="form_alert" style="display: none;">Обязательное поле!</li><br>
        </tpl>
        <tpl if="avance_comp">
    		<li class="form_text">Условие аванса</li><li class="form240"><div class="input_wrap"><input type="text" name="conditions_advance" data-bind="value: v.conditions_advance"></div></li>
    		<li class="form_alert" style="display: none;">Обязательное поле!</li><br>
        </tpl>

		<li class="form_text two_lines">Максимальная стоимость договора, указанная в СРО</li><li class="form240"><div class="input_wrap"><input type="text" name="max_contract_val" data-bind="value: v.max_contract_val"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле!</li><br>

		<li class="form_text">Примечание</li><li class="form240"><div class="input_wrap"><textarea name="notes" data-bind="value: v.notes"></textarea></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле!</li><br>
        
        <li class="form_text">Описание файла</li><li class="form240"><div class="input_wrap"><textarea name="file_descript" data-bind="value: v.file_descript"></textarea></div></li>
    	<li class="form_alert" style="display: none;">Обязательное поле!</li><br>

		<li class="form_text two_lines">Скан заявки на тендер <br>по типовой форме</li><li class="form240"><div class="input_wrap file_wrap"><input type="file" name="file"><div class="file_dummy">Выберите файл...</div></div></li><br>
        
        <li class="form_text two_lines">Предложение </li><li class="form240"><div class="input_wrap file_wrap"><input type="file" name="file1"><div class="file_dummy">Выберите файл...</div></div></li><br>
        
		
    
        <tpl if="positions">
            </ul>
            <h2>Предлагаемые цены по позициям тендера</h2>
            <p><span data-bind="text: finTimePhrase"></span> <span data-bind="text: finTime"></span></p>
            <for data-bind="foreach: positions">
                <ul class="inlined bid_price">
            		<li class="form18"><text data-bind="text: ($index() + 1)"></text>.</li>
            		<li class="form136">
                        <text data-bind="text: name"></text>,
                        <br><text data-bind="text: uname"></text>, 
                        <text data-bind="text: counts"></text>
                    </li>
            		<li class="form108"><span>за единицу</span><div class="input_wrap"><input type="text" data-bind="value: price1, attr: {['{']}name: iname1{['}']}, event:{['{']}change: $parent.priceChanged1{['}']}"></div></li>
            		<li class="form108"><span>полная цена</span><div class="input_wrap"><input type="text" data-bind="value: price2, attr: {['{']}name: iname2{['}']}, event:{['{']}change: $parent.priceChanged2{['}']}"></div></li>
            
                    <for data-bind="foreach: otherprices">
                		<li class="form18"></li>
                		<li class="form136 gray_text" data-bind="text: name"></li>
                		<li class="form108 gray_text" data-bind="text: price1"></li>
                		<li class="form108 gray_text" data-bind="text: price2"></li>
            		</for>
            
            	</ul>
            </for>    
            <ul class="inlined"><li class="form_text">&nbsp;</li><br>
        </tpl>
    
		<li class="form_text"></li><li class="form120"><button type="submit" data-bind="enable: tenderIsActive"><span class="tndr_btn">подать заявку</span></button></li>
	</ul>
</form>
</div>
<!-- Data Model -->
{{include 'DataModel.inc'}}

