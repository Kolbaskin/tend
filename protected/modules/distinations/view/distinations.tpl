<h2>Направление торгов</h2>

<p>Внимание! При сохранении изменений настроек на этой странице, доступ к участию в торгах будет автоматически заблокирован до момента одобрения изменений администрацией торговой площадки.</p>

<form method="post">
    <table>
        <tpl for="items">
            <tr>
                <th colspan="4">{name}</th>
            </tr>
            <tpl for="works">
                <tr>
                    <td>{name}</td>
                    <td><input type="checkbox" name="works" value="{_id}" <tpl if="checked">checked</tpl>></td>
                    <td>
                        <tpl if="status==1">проверка</tpl>
                        <tpl if="status==2">одобрено</tpl>
                        <tpl if="status==3">ошибка</tpl>
                    </td>
                    <td>
                        <tpl if="notes">{notes}</tpl>
                    </td>
                </tr>
            </tpl>
        </tpl>
    </table>
    <input type="hidden" name="works" value='' />
    <button type="submit">сохранить</button>

</form>